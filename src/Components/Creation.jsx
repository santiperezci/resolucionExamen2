import React, { useState } from 'react';
import './Styles.css'
import { gql, useMutation } from '@apollo/client';

const ADD = gql`
    mutation CreateRepository($name: String!, $visibility:RepositoryVisibility!,$description: String){
        createRepository(input:{name:$name, visibility:$visibility, description:$description}){
            repository{
                name
            }
        }
    }
`

function Creation() {
    const [visibility,setVisibility] = useState(null);
    
    const [addRepository,
        {data, loading: mutationLoading, error: mutationError }] = 
        useMutation(ADD);

  return (
    <div className="Creation">
         <input id="name" placeholder='Nombre repositorio'/>
         <select className="filter_select" onChange={e=> setVisibility(e.target.value)}>
            <option selected='selected' value={null}>--Select visibility--</option>
            <option value="PRIVATE">PRIVATE</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="INTERNAL">INTERNAL</option>
        </select>
         <input className='description' id="description" placeholder='Introducir descripción'/>
         <p className='create' onClick={(e)=>{e.preventDefault();
         addRepository({variables:{name:document.getElementById("name").value,visibility:visibility,description:document.getElementById("description").value}});}}>Create</p>
         {mutationLoading?
            <p>{`Loading...`}</p>
         :mutationError?
            <p>{`Error al crear repositorio`}</p>
         :data?
            <p>{`Repositorio ${data.createRepository.repository.name} creado`}</p>
        :null}
    </div>
  );
}

export default Creation;
