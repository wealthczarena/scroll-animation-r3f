import { Text, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Model()
{
    const model = useGLTF('./bunny_can.glb')
    const modelRef = useRef()
    const veganRef = useRef()
    const sodaRef = useRef()

    useEffect(() =>
    {
        const modelObject = modelRef.current
        modelObject.rotation.y = Math.PI

        const veganObject = veganRef.current
        const sodaObject = sodaRef.current

        /**
         * Animations
         */
        if(modelObject && veganObject && sodaObject)
        {
            gsap.set(modelObject.scale, { x: 0, y: 0, z: 0 })

            //simultaneous text animations
            gsap.from([ veganObject.position, sodaObject.position ], {
                duration: 1,
                x: 0,
                opacity: 1,
                stagger: 0.5,
                ease: 'power2.out'
            })

            // model animation
            gsap.to(modelObject.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1, delay: 1 });

            // centering the model
            setTimeout(() => {
                const boundingBox = new THREE.Box3().setFromObject(modelObject)
                const offset = new THREE.Vector3()
                boundingBox.getCenter(offset).negate()
                modelObject.position.add(offset)

                gsap.to(modelObject.rotation, {
                y: Math.PI * 3, 
                duration: 1,
                })
            }, 1500) 
        }
        
        ScrollTrigger.create({
            trigger: ".scroll-trigger",
            start: 'top top',
            end: 'bottom bottom', 
            onEnter: () => {
                console.log('SCrolltrigger enter triggered')
                // gsap.to([ veganObject.position, sodaObject.position ], {
                //     duration: 1,
                //     opacity: 0,
                // })
            }
        })

    }, [model])

    return <group>
    <Text
        font='./BerriesPersonaluse.woff'
        fontSize={ 2 }
        color='black'
        // position-x={ -4.8 }
        position={ [ -4.8, 0, 0 ] }
        ref={ veganRef }
    >
      Vegan</Text>

    <primitive 
        object={ model.scene }
        ref={ modelRef }
        scale={ [ 0, 0, 0 ] }
        opacity={ 0 }
    />

    <Text
        font='./BerriesPersonaluse.woff'
        fontSize={ 2 }
        color='black'
        // position-x={ 4.45 }
        position={ [ 4.45, 0, 0 ] }
        ref={ sodaRef }
    >
      Sodur</Text>

</group>

}