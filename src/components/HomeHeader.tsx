import { HStack, VStack, Heading, Text, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "./UserPhoto";

export function HomeHeader(){
  return(
    <HStack bg='gray.600' pt={16} pb={5} px={8} alignItems='center'>
      <UserPhoto 
        source={{ uri: 'https://github.com/EduardoSivelli.png' }}
        alt="Imagem do Usuário"
        size={16}
        mr={4}
      />

      <VStack>
        <Text color='gray.100' fontSize='md'>
          Olá,
        </Text>

        <Heading color='gray.100' fontSize='md'>
          Eduardo
        </Heading>
      </VStack>

      <Icon 
        as={MaterialIcons}
        name="logout"
        color="gray.200"
        size={7}
      />
      
    </HStack>
  )
}