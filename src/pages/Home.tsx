import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonFooter, IonList, useIonLoading, useIonAlert, IonAvatar, IonImg, IonIcon } from '@ionic/react';
import useApi, { SearchResult, SearchType } from '../hooks/useApi';
import { useEffect, useState } from 'react';
import {gameControllerOutline, tvOutline, videocamOutline} from 'ionicons/icons'

const Home: React.FC = () => {
  const {searchData} = useApi ()

  const [searchTerm, setSearchTerm] = useState('')
  const [type, setType] = useState<SearchType>(SearchType.all)
  const [results, setResults] = useState<SearchType[]>([])
  const [presentAlert] = useIonAlert()
  const [loading, dismiss] = useIonLoading()


  useEffect(() => {
    if (searchTerm === ''){
      setResults([])
      return
    }

    const loadData = async()=> {
      await loading()
      const result: any = await searchData(searchTerm, type)
      console.log('~ file: Home.tsx:31 ~ loadData ~ result', result)
      await dismiss()
      if(result?.Error){
        presentAlert(result.Error)
      } else {
        setResults(result.Search)
      }
     
    }
    loadData()
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'tertiary'}>
          <IonTitle>Pinto Filmes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonSearchbar value={searchTerm} 
        debounce={300}
        onIonChange={(e) => setSearchTerm(e.detail.value!)}>
        </IonSearchbar>
        
        <IonItem>
          <IonLabel>
          <IonSelect value={type} onIonChange={(e) => 
            setType(e.detail.value!) }>
              <IonSelectOption value="">Tudo</IonSelectOption>
              <IonSelectOption value="movie">Filmes</IonSelectOption>
              <IonSelectOption value="series">Séries</IonSelectOption>
              <IonSelectOption value="episode">Episódios</IonSelectOption>    
          </IonSelect>
          </IonLabel>
        </IonItem>

        <IonList>
          {results.map((item: SearchResult) =>(
            <IonItem button key={item.imdbID} routerLink={`/movies/${item.imdbID}`}>
              <IonAvatar slot = 'start'>
                <IonImg src={item.Poster}></IonImg>
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>

              {item.Type === 'movie' && <IonIcon slot="end" icon={videocamOutline} />}
              {item.Type === 'series' && <IonIcon slot="end" icon={tvOutline} />}
              {item.Type === 'game' && <IonIcon slot="end" icon={gameControllerOutline} />}
              
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar color={'tertiary'}>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonFooter>

    </IonPage>
  );
};

export default Home;
