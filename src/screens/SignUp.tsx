import { useNavigation } from '@react-navigation/native'

import { VStack, Image, Text, Center, Heading, ScrollView, View } from 'native-base'

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from '@assets/background3x.png'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignUp(){

  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack()
  }

  return(
    //<View bg="gray.700">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack flex={1} pb={16} >
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
              Crie sua Conta
            </Heading>

            <Input 
              placeholder='Nome'
            />

            <Input 
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
            />

            <Input 
            placeholder='Senha'
            secureTextEntry
            />

            <Button title='Criar e acessar'/>
          </Center>

          <Center px={10} mt={24}>
            <Button title='Voltar para o login' variant="outline" onPress={handleGoBack}/>
          </Center>    
        </VStack>
      </ScrollView>
    //</View>
  )
}