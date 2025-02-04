import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import useApi, { SearchType } from '../hooks/useApi';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const {searchData} = useApi ()

  const [searchTerm, setSearchTerm] = useState('')
  const [type, setType] = useState<SearchType>(SearchType.all)
  const[result, setResults] = useState([])

  useEffect(() => {
    if (searchTerm === ''){
      setResults([])
      return
    }

    const loadData = async()=> {
      const result = await searchData(searchTerm, type)
      
      setResults(result)
    }
    loadData()
  }, [searchTerm]);

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
            Tipo de Busca
          </IonLabel>
          <IonSelect value={type} onIonChange={(e) => 
            setType(e.detail.value!) }>
              <IonSelectOption value="">Tudo</IonSelectOption>
              <IonSelectOption movie="">Filmes</IonSelectOption>
              <IonSelectOption serie="">Séries</IonSelectOption>
              <IonSelectOption episode="">Episódios</IonSelectOption>
              
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
