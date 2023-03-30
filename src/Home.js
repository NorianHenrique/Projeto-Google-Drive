import React,{useEffect, useState} from 'react';
import './Home.css';
import Logo from './icon.png';
import {db, storage, auth} from './firebase';
import {AiTwotonePlusSquare, AiFillFolder,AiFillForward} from 'react-icons/ai';
import {BsDownload} from 'react-icons/bs';

function Home(props){

    const[progress,setProgress] = useState(0);
    const[arquivos,setArquivos] = useState([]);

    useEffect(()=>{
         db.collection('drive').doc(props.user.uid).collection('files').onSnapshot((snapshot)=>{
            
            setArquivos(snapshot.docs.map(l=>{

                return l.data();

            }));
         })
    },[props])

function sair(e){
    e.preventDefault();
    auth.signOut().then(()=>{

        alert('Deslogado');
        window.location.href="/";
    }).catch((error) =>{

    });

}

function fazerUploadArquivo(uid){
    let arquivo = document.querySelector('[name=arquivo]').files[0];


    alert(arquivo.name);

    alert(arquivo.type);



    const uploadTask = storage.ref('drive/'+uid+'/files/'+arquivo.name).put(arquivo);



    uploadTask.on('state_changed',(snapshot)=>{

        const progressTempo = (snapshot.bytesTransferred/snapshot.totalBytes) * 1;
        
        setProgress(progressTempo);

    },

    function(error){



    },



    function(){

        storage.ref('drive/'+uid+'/files/'+arquivo.name).getDownloadURL().then((url)=>{

            db.collection('drive').doc(uid).collection('files').add({
                arquivoURL: url,
                tipo_arquivo: arquivo.type,
                nome:arquivo.name

            })

        })

        alert('Upload realizado com sucesso!');
        setProgress(0);
        

    }

    )

}
   return(
      <div className='main'>
         <div className='header'>
             <div className='header_logo'>
                <img src={Logo}/>
             </div>

             <div className='header_pesquisa'>
                 <input type='text' placeholder='Sua buscar'/>
             </div>

             <div className='header_user'>
                 <img src={ props.user.imagem } />
                 <a onClick={(e)=>sair(e)} href="#">Sair</a>
             </div>

         </div>
         
          <div className='main_header'>
               <div className='sidebar'>
                   <form>
                        <label className='btn_file' for="arquivo"><AiTwotonePlusSquare/>NOVO</label>
                       <input onChange={()=>fazerUploadArquivo(props.user.uid)}id='arquivo' className='input_hidden' type='file'  name='arquivo'/>
                   </form>

                   <div className='main_folders'>
                       <div className='main_foldersDrive'>
                            <AiFillFolder/><span>Meu drive</span>
                            
                       </div>
                       {
                     (progress > 0)?
                     <div>
                        <label for="file">Downloads progress</label>
                        <progress id='file' value={progress} max='1'>{progress}%</progress>
                     </div>
                     :
                     <div></div>
                   }

                   </div>
                  

               </div>

               <div className='main_content'>
                    <div className='mainTopoText'>
                         <h2>Meu Drive</h2>
                    </div>
                    <div className='boxFiles'>
                        {
                            arquivos.map(function(data){
                                if(data.tipo_arquivo == 'video/mp4'){  
                                return(
                                    <div className='boxFilesSingle'>
                                    <div className='iconDownloads'>
                                         <BsDownload/>
                                    </div>
                                     <a href={data.arquivoURL}>
                                       {data.nome}
                                     </a>
                                </div>
                            
                                )
                            }else if(data.tipo_arquivo == 'imagem/png'){

                                return(
                                    <div className='boxFilesSingle'>
                                    <div className='iconDownloads'>
                                         <AiFillForward/>
                                    </div>
                                     <a href={data.arquivoURL}>
                                       {data.nome}
                                     </a>
                                </div>
                            
                                )

                            }else{

                                return(
                                    <div className='boxFilesSingle'>
                                    <div className='iconDownloads'>
                                         <BsDownload/>
                                    </div>
                                     <a href={data.arquivoURL}>
                                       {data.nome}
                                     </a>
                                </div>
                            
                                )

                            }
                            })

                        }
                        
                    </div>
                           
               </div>
          </div>
      </div>
   )
}

export default Home;