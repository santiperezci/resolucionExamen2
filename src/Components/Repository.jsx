import React, { useState } from 'react';
import './Styles.css'
import { gql, useMutation } from '@apollo/client';

const ARCHIVE = gql`
        mutation ArchiveRepository($repositoryId: ID!){
            archiveRepository(input:{repositoryId: $repositoryId}){
                repository{
                    name
                }
            }
        }
    `

function Repository(props) {
    const {name,id} = props.info;
    const [archive, setArchive] = useState(false);
    
    const [archiveRepository,
        {data, loading: mutationLoading, error: mutationError }] =
        useMutation(ARCHIVE);

  return (
    <div className="Repository">
        <h3 onClick={()=>{setArchive(!archive)}}>{name}</h3>
        {archive?
            <div>
                <span onClick={(e)=>{e.preventDefault();
                archiveRepository({variables:{repositoryId: id}});}}>Archivar</span>
                {mutationLoading?
                    <span>{`   -> Loading...`}</span>
                :mutationError?
                    <span>{`   -> Error al archivar`}</span>
                :data?
                    <span>{`   -> Repositorio archivado`}</span>
                :null}
            </div>
        :null}
    </div>
  );
}

export default Repository;