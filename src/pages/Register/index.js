import {useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../firebaseConnection'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify' 

function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

  async  function handleRegister(e){
        e.preventDefault()

        if(email !== '' && password!== ''){
          await createUserWithEmailAndPassword(auth, email, password).then(() =>{
            
            navigate('/admin', {replace: true})
            toast.success('Conta criada com sucesso!')
          }).catch((e) => {console.log(e)
              if(e == 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
                toast.warn('Este e-mail já está em uso')
              }
          })
          
        }
        else{
            toast.warn('Preencha todos os campos')
        }
    }
    return(
      <div className='home-container'>
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta!</span>

        <form className='form' onSubmit={handleRegister}>
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
            
            <button type="submit">Cadastrar</button>
           
        </form>

       <span className='button-link'>Já possui uma conta? <Link to="/" className='button-link-link'> Faça o login</Link> </span>
      </div>
    )
  }
  export default Register;