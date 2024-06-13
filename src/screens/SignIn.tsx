import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, View } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from '@assets/background3x.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required('Informe seu e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha')
})

export function SignIn(){
  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  
  function handleSingIn({email, password}: FormDataProps){
    console.log({email, password})
  }

  function handleNewAccount(){
    navigation.navigate('signUp')
  }
  return(
    //<View  flex={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack flex={1}  pb={16} >
          <Image 
            source={BackgroundImg}
            defaultSource={BackgroundImg}
            alt="Pessoas Treinando"
            resizeMode='cover'
            size="full"
            position="absolute"
            />

          <Center my={24}>
            <LogoSvg />

            <Text color="gray.100" fontSize="sm">
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center px={10} mt={16}>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
              Acesse sua Conta
            </Heading>

            <Controller 
              control={control}
              name='email'
              render={( {field : { onChange, value }}) => (
                <Input 
                  placeholder='E-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name='password'
              render={( {field : { onChange, value }}) => (
                <Input 
                  placeholder='Senha'
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSingIn)}
                  returnKeyType='send'
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button 
              title='Acessar' 
              onPress={handleSubmit(handleSingIn)}
            />
          </Center>

          <Center px={10} mt={24}>
            <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body"> 
              Ainda não tem acesso?
            </Text>

            <Button title='Criar conta' variant="outline" onPress={handleNewAccount}/>
          </Center>    
        </VStack>
      </ScrollView>
    //</View>
  )
}