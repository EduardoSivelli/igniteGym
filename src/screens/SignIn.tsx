import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, View } from 'native-base'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from '@assets/background3x.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignIn(){

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

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

            <Input 
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <Input 
            placeholder='Senha'
            secureTextEntry
            />

            <Button title='Acessar'/>
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