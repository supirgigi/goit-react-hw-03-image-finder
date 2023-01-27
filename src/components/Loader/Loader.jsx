import { TailSpin } from 'react-loader-spinner';
import { Wrapper, Text } from './Loader.styled';

const Loader = () => {
  return (
    <Wrapper>
      <TailSpin
        height="30"
        width="30"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <Text>Loading...</Text>
    </Wrapper>
  );
};

export default Loader;
