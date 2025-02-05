import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonFooter, IonList, useIonLoading, useIonAlert, IonAvatar, IonImg, IonIcon, IonButton, IonBackButton, useIonViewWillEnter, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import useApi, { DetailsResult } from '../hooks/useApi';
import { starHalfOutline } from 'ionicons/icons';

interface DetailPageProps
    extends RouteComponentProps<{
        id:string;
    }> {}

const Detail: React.FC<DetailPageProps> = ({match}) => {

    const {getDetails} = useApi ()
    const [information, setInformtion] = useState<DetailsResult>(null);

    useIonViewWillEnter( async () => {
        const id = match.params.id
        const data = await getDetails(id)
        setInformtion(data)
        console.log('~ file: Detail.tsx:26 ~ useIonsViewWillEnter ~ data', data)
    })

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton color={'tertiary'} slot='start'>
                        <IonBackButton defaultHref='/movies'></IonBackButton>
                    </IonButton>
                    <IonTitle>Titulo do Conteúdo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {information && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{information.Title}</IonCardTitle>
                            <IonCardSubtitle>{information.Year}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent text-center>
                            <IonImg src={information.Poster}/>

                            <IonItem lines="none">
                            <IonIcon icon={starHalfOutline} slot="start" color="warning" />
                            <IonLabel>{information.imdbRating}</IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Detail;