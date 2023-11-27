// import { OrbitControls } from '@react-three/drei'
import Model from './Model'

export default function Experience()
{
  

  return <>
      {/* <OrbitControls /> */}

      <directionalLight position={ [ 1, 2, 3 ] } />
      <ambientLight intensity={ 2 } />

      <Model />
  </>
}