import React from 'react';
import { Button, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const PickImage = props => {
    const handleImagePick = async () => {
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4,3],
                quality:1,
                base64: true,
            });
             if(!result.cancelled){
                 props.setImage(`data:image/jpg;base64,${result.base64}`);
             }
        }
         catch(E) {
             console.log(E);
         }
    }

    let showImage = null;
    if(props.image!==""){
        showImage =<Image source={{ uri :props.image}} style={{width:"100%", height:200, marginBottom:10}} />
    }
    return (
       <View>
           {showImage}
           <Button title="Select A Photo" onPress={handleImagePick} />
       </View>
    );
};

export default PickImage;