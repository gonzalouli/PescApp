import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, isPlatform } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import BackButton from '../components/BackButton'
import RefreshComponent from '../components/RefreshComponent';
import { Camera, CameraResultType } from '@capacitor/camera';
import '../theme/NewActivityCatch.css'

export default function NewActivityCatch() {
    const [fechaInicio, setSelectedInitDate] = useState<string>('');
    const [fechaFin, setSelectedEndDate] = useState<string>(fechaInicio);
    const [hora, setHora] = useState<string>('');
    const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL+'/assets/placeholderimage.jpg')
    const [name, setName] = useState("")
    const fileInputRef = useRef<HTMLInputElement>()

    useEffect(()=>()=>{
        if(imageUrl.startsWith('blob:')){
            URL.revokeObjectURL(imageUrl)
        }
    }  
    ,[imageUrl])

    const handleFileChange = async (event : React.ChangeEvent<HTMLInputElement>) =>{
        if(event.target.files.length >0){
            const file = event.target.files.item(0)
            const imageUrl = URL.createObjectURL(file)
            setImageUrl(imageUrl)
        }
    }
    console.log(isPlatform('capacitor'))

    const handlePictureClick = async ()=>
    {
      //for right platforms
        if(isPlatform('android') || isPlatform('ios') ){
            try{
                const image = await Camera.getPhoto({
                    quality: 90,
                    allowEditing: true,
                    resultType: CameraResultType.Uri
                });
                setImageUrl(image.webPath)
            }catch(error)
            {
            console.error('Camera Error:',error.message)
            }
        }else
        {
            fileInputRef.current.click()
        }

    }

    return (
        <IonPage>
        <IonHeader className="header">
                <BackButton refer="/my/newActivity" />
                <IonTitle className='tittle'>Nueva Captura</IonTitle>
        </IonHeader>
        <IonContent>
            <RefreshComponent/>
                <IonList className="content-container">
                    <IonItem className="item-container">
                        <IonLabel className="label" position="floating">Nombre de especie</IonLabel>
                        <IonInput className="text" type='text' value={name} 
                            onIonChange={e=>setName(e.detail.value)}/>                    
                    </IonItem>
                    <IonItem className="item-container">
                        <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} hidden></input>
                        <img className="placeholder" src={imageUrl} alt="" onClick={handlePictureClick}/>
                    </IonItem>

                </IonList>
        </IonContent>
        </IonPage>
    )
}
