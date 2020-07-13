import React,{useState} from 'react';
import { gql, useQuery } from '@apollo/client';
import Repository from './Repository'
import Creation from './Creation'
import './Styles.css'

const GET_INFO = gql `
    query Viewer{
        viewer{
            login,
            name,
            email,
            repositories(last:10){
                nodes{
                    id,
                    name
                }
            },
            followers(last: 100){
                totalCount,
                nodes{
                    id,
                    name
                }
            },

        }
    }
`

function Github(props) {
    const [followers, setFollowers] = useState(false);
    const [add, setAdd] = useState(false);

    const {loading,error,data} = useQuery(GET_INFO);

    if (loading) return (<h1>Cargando...</h1>);
    if (error) props.setValid(false);

    return (
        data?
            <div className="Github">
                <div className='user'>
                    <h2>{data.viewer.login}</h2>
                    <h3>{data.viewer.name}</h3>
                    <h4>{data.viewer.email}</h4>
                    <h5 className='n_followers' onClick={()=>{setFollowers(!followers)}}>{`Número de seguidores: ${data.viewer.followers.totalCount}`}</h5>
                    <h4 className='b_create' onClick={()=>{setAdd(!add)}}>Crear repositorio</h4>
                </div>
                <div>
                {followers?
                    data.viewer.followers.nodes.map((elem)=>{return <h3 key={elem.id}>{elem.name}</h3>})
                :null}
                {add?
                    <Creation/>
                :null}
                </div>
                <div className='repositories'>
                    {data.viewer.repositories.nodes.map((elem)=>{return <Repository key={elem.id} info={elem}/>})}
                </div>
            </div>
        :null
    );
}

export default Github;