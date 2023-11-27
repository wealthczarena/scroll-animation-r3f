import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <div className='scroll-trigger'>
    <Canvas>
        <Experience />
    </Canvas>
  </div>
)


