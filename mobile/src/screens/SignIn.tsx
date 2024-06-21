import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, View, useToast } from 'native-base'
import { useForm, Controller } from 'react-hook-form'

import { AuthNavigatorRoutesProps } from 'src/routes/auth.routes'

import { useAuth } from '@hooks/useAuth' 

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from '@assets/background3x.png'

import { Input } from 'src/components/Input'
import { Button } from 'src/components/Button'
import { AppError } from '@utils/AppError'

type FormDataProps = {
  email: string;
  password: string;
}


export function SignIn(){
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()
  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>();
  const toast = useToast()

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  
  async function handleSingIn({email, password}: FormDataProps){
    try{
      setIsLoading(true)
      await signIn(email, password);

    } catch (error){
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde!'

      setIsLoading(false)

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
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
              rules={{ required: 'Informe o e-mail'}}
              render={( {field : { onChange }}) => (
                <Input 
                  placeholder='E-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name='password'
              rules={{ required: 'Informe a senha'}}
              render={( {field : { onChange }}) => (
                <Input 
                  placeholder='Senha'
                  secureTextEntry
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(handleSingIn)}
                  returnKeyType='send'
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button 
              title='Acessar' 
              onPress={handleSubmit(handleSingIn)}
              isLoading={isLoading}
            />
          </Center>

          <Center px={10} mt={24}>
            <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body"> 
              Ainda não tem acesso?
            </Text>

            <Button 
              title='Criar conta' 
              variant="outline"
              onPress={handleNewAccount}
            />
          </Center>    
        </VStack>
      </ScrollView>
    //</View>
  )
}