import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast, Toast } from "native-base"; 
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  last_password: string;
  new_password: string;
  password_confirm: string;
}

const signInSchema = yup.object({
  name: yup.string().required('Informe seu nome'),
  last_password: yup.string().required('Informe a senha'),
  new_password: yup.string().required('Informe a senha'),
  password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('new_password'), ''], 'A confirmação da senha está incorreta')
})

  export function Profile(){
    const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
      resolver: yupResolver(signInSchema)
    });

    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState('https://github.com/EduardoSivelli.png')

    const toast = useToast() 
    
    async function handleUserPhotoSelect() {
      setPhotoIsLoading(true)

      try {
        const photoSelected = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          aspect: [4, 4],
          allowsEditing: true,
          selectionLimit: 1,
        });
      
        if(photoSelected.canceled) {
          return;
        }

        if (photoSelected.assets[0].uri) {
          const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

          if(photoInfo.exists && ( photoInfo.size / 1024 / 1024) > 5 ) {
            return toast.show({
              title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
              placement: 'top',
              bgColor: 'red.500'
            })
            
          }

          setUserPhoto(photoSelected.assets[0].uri);
        }
        
      } catch (error) {
        console.log(error)
      } finally{
        setPhotoIsLoading(false)
      }
    }
    function handleUpdate({name, last_password, new_password, password_confirm}: FormDataProps){
      console.log({name, last_password, new_password, password_confirm})
    }
  return(
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>

      <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
        <Center mt={6} px={10}>
          { photoIsLoading ? 
            <Skeleton  
            w={PHOTO_SIZE} 
            h={PHOTO_SIZE} 
            rounded="full"
            startColor="gray.600"
            endColor="gray.400"
            />
            :
            <UserPhoto 
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller 
            control={control}
            name="name"
            render={() => (
              <Input 
                bg="gray.600"
                placeholder="Nome"
                errorMessage={errors.name?.message}
              />
            )}
          />
          
          <Input 
            bg="gray.500"
            placeholder="marquessivelli@hotmail.com"
            placeholderTextColor="gray.200"
            isDisabled
          />
        
          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12} fontFamily='heading'>
            Alterar senha
          </Heading>
          
          <Controller 
            control={control}
            name="last_password"
            render={() => (
              <Input 
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                errorMessage={errors.last_password?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="new_password"
            render={() => (
              <Input 
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                errorMessage={errors.new_password?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="password_confirm"
            render={() => (
              <Input 
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button 
            title="Atualizar" 
            mt={4}
            onPress={handleSubmit(handleUpdate)}
          />
        </Center>
        
      </ScrollView>
    </VStack>
  )
}