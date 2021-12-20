import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, isPlatform } from '@ionic/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import BackButton from '../components/BackButton'
import RefreshComponent from '../components/RefreshComponent';
import { Camera, CameraResultType } from '@capacitor/camera';
import '../theme/NewActivityCatch.css'
import { randomBytes } from 'crypto';
import {nanoid} from 'nanoid'

export default function NewActivityCatch() {

    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL+'/assets/placeholderimage.jpg')
    const [name, setName] = useState("")
    const fileInputRef = useRef<HTMLInputElement>()
    const [tempactivity,setTempactivity] = useState(JSON.parse(window.sessionStorage.getItem("newActivity")) || [])

    const [piece,setPiece] = useState({   
            id:nanoid(),
            name:"",
            imageUrl:imageUrl,
            description:""
        })

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
            setPiece({...piece,imageUrl:imageUrl})

        }
    }

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
                setPiece({...piece,imageUrl:image.webPath})
            }catch(error)
            {
            console.error('Camera Error:',error.message)
            }
        }else
        {
            fileInputRef.current.click()
        }

    }

    const handleTextChange = e  =>{
        setDescription(e.target.value)
        setPiece({...piece,description:description})

    }

    const handleName = (e)=>{
        setName(e.target.value)
        setPiece({...piece,name:name})
    }

    const saveAndBack= async ()=>{
        const activity = JSON.parse(window.sessionStorage.getItem("newActivity"))
        await activity.catch.push(piece)
        window.sessionStorage.setItem("newActivity",JSON.stringify(activity))
    }

    const saveAndNew= async()=>{
        const activity = JSON.parse(window.sessionStorage.getItem("newActivity"))
        setPiece({...piece,imageUrl:imageUrl})

        await activity.catch.push(piece)
        window.sessionStorage.setItem("newActivity",JSON.stringify(activity))
        
        setTempactivity(activity)

        setName("")
        setImageUrl(process.env.PUBLIC_URL+'/assets/placeholderimage.jpg')
        setDescription("")
        setPiece({   
            id:nanoid(),
            name:name,
            imageUrl:imageUrl,
            description:description
        })
    }



    return (
        <IonPage>
        <IonHeader className="header">
                <BackButton refer="/my/NewActivity" />
                <IonTitle className='tittle'>Nueva Captura</IonTitle>
        </IonHeader>
        <IonContent>
            <RefreshComponent/>
                <IonList className="content-container">
                    <IonItem className="item-container">
                        <IonLabel className="label" position="floating">Nombre de especie</IonLabel>
                        <IonInput className="text" type='text' value={name} 
                            onIonChange={handleName}/>                    
                    </IonItem>
                    <IonItem className="item-container">
                        <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} hidden></input>
                        <img className="placeholder" src={imageUrl} alt="" onClick={handlePictureClick}/>
                    </IonItem>
                    <IonItem className="description">
                            <IonLabel className="label" position="floating">Descripción</IonLabel>
                            <IonTextarea value={description} onIonChange={handleTextChange}></IonTextarea>
                        </IonItem>
                </IonList>
                <div className="submit buttons">
                    <IonList className="submit buttons">
                        <IonItem >
                            <IonButton className="save" onClick={saveAndBack} href="/my/NewActivity">Guardar</IonButton>
                        </IonItem>
                        <IonItem >
                            <IonButton className="save" onClick={saveAndNew} >Guardar y nuevo</IonButton>
                        </IonItem>
                    </IonList>
                </div>

                <IonList className="capturas">
                    <IonItem className="capturas">
                        <IonLabel className="capturasNuevas label">Capturas actuales</IonLabel>
                    </IonItem>
                    <IonList>
                        { tempactivity.catch.map( item=>{
                            return(
                                <IonCard key={item.id}>
                                    <IonCardHeader>
                                        <IonButton className="delete" />
                                        <IonCardTitle>{item.name}</IonCardTitle>
                                        <img src={item.imageUrl} alt={item.id}/>
                                        {item.imageUrl}
                                    </IonCardHeader>
                                    <IonCardContent>
                                    {item.description}
                                    </IonCardContent>
                                </IonCard>
                            )
                            })
                        }
                    </IonList>
                </IonList>
        </IonContent>
        </IonPage>
    )
}
