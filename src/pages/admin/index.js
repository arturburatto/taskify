import './admin.css'
import { useState, useEffect } from 'react';
import {auth, db} from '../../firebaseConnection'
import { signOut } from 'firebase/auth';
import { doc, addDoc, collection, deleteDoc, updateDoc } from 'firebase/firestore';
import { onSnapshot, query, orderBy, where } from 'firebase/firestore';
import {toast} from 'react-toastify'

function Admin(){
    const [tarefa, setTarefa] = useState('')
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    const [edit, setEdit] = useState({})

    useEffect(() =>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, 'tarefas')
                const q = query(tarefaRef, orderBy("created", "desc"), where("email", "==", data?.email))
                const unsub = onSnapshot(q, (snapshot) =>{
                    let lista = [];

                    snapshot.forEach((doc) =>{
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            email: doc.data().email
                        })
                    })
                    setTarefas(lista)
                    
                })
            }
        }

        

        loadTarefas()
    }, [])

  async function handleRegister(e){
        e.preventDefault();
        if (tarefa === ''){
            toast.warn('A tarefa não pode estar vazia!')
            return
        }

        if(edit?.id){
            handleUpdateTarefa();
            return
        }


        await addDoc(collection(db, 'tarefas'), {
            tarefa: tarefa,
            created: new Date(),
            email: user?.email
        }).then(() =>{
            console.log('tarefa registrada')
            setTarefa('')
        }).catch((e) =>{console.log(e)})


    }

    async function handleLogout(){
        await signOut(auth)
    }

    async function deletaPost(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    function editTarefa(item){
        setTarefa(item.tarefa)
        setEdit(item)
      
    }

    async function handleUpdateTarefa(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefa
        }).then(() => {
            console.log('Tarefa atualizada com sucesso')
            setTarefa('')
            setEdit({})
        }).catch((e) => {console.log('erro ao atualizar ' + e)
        setTarefa('')
        setEdit({})
    })
    }

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>
            <form onSubmit={handleRegister} className='form'>
                <textarea placeholder='Digite sua tarefa' 
                value={tarefa}
                onChange={(e) =>{setTarefa(e.target.value)}}/>

                {Object.keys(edit).length > 0 ? (
                <button className='btn-register'type='submit' style={{backgroundColor: '#7080d6'}}>Atualizar tarefa</button>) : (
                <button className='btn-register'type='submit'>Adicionar tarefa</button>
                )}
            </form>
            


        {tarefas.map((item) => 
            (
                <article key={item.id} className='list'>
                <p>{item.tarefa}</p>
                <div>
                    <button className='btn-edit' onClick={() => editTarefa(item)}>Editar</button>
                    <button className='btn-delete' onClick={() => deletaPost(item.id)}>Concluir</button>
                </div>
            </article>
            )
        )}
            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default Admin;