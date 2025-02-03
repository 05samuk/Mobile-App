import './ExploreContainer.css';
import { IonButton } from '@ionic/react';

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <strong>Olá</strong>
      <p>
        Start with Ionic{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
      {/* Adicionando o botão */}
      <IonButton onClick={() => alert('Hello World!')}>Clique Aqui</IonButton>
    </div>
  );
};

export default ExploreContainer;
