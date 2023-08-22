import {useState} from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import {auth} from '../../firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

function Home(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

  async  function handleLogin(e){
        e.preventDefault()

        if(email !== '' && password!== ''){
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                navigate('/admin', {replace: true})
            }).catch((e) => {
              console.log(e)
              if(e == 'FirebaseError: Firebase: Error (auth/wrong-password).'){
                toast.warn('Usuário e/ou senha incorretos!')
              } else if(e == 'FirebaseError: Firebase: Error (auth/user-not-found).'){
                toast.warn('Usuário não cadastrado')
              }
            })
        }else{
            toast.warn('Preencha todos os campos')
        }
    }
    return(
      <div className='home-container'>
        <h1>Taskify.</h1>
        <span>Gerencie suas tarefas de forma fácil</span>

        <form className='form' onSubmit={handleLogin}>
            <input
            type='text'
            placeholder='Digite seu email'
            onChange={(e) => {setEmail(e.target.value)}}
            />

            <input
            type='password'
            placeholder='********'
            onChange={(e) => {setPassword(e.target.value)}}
            />
            
            <button type="submit">Acessar</button>
           
        </form>

       <span className='button-link'>Não possui uma conta ainda? <Link to="/register" className='button-link-link'> Cadastre-se</Link> </span>
      </div>
    )
  }
  export default Home