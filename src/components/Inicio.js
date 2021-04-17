import { useEffect, useState } from "react"
import { Col, Jumbotron, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import Loading from "../loader/Loading"
import CardMenu from "./CardMenu"

export default function Inicio({firebaseDB}){
    const [menuses, setMenuses]  = useState([])
    const [loading, setLoading] = useState(true)
    const [textoLoading, setTextoLoading] = useState("Cargando...")

    useEffect(()=>{
        setTextoLoading("Cargando...")
        setLoading(true)

        const getMenu = async () =>{

            try{
                const menuCollection = await firebaseDB.collection("menu").where("active", "==", true).orderBy("orden").get()
                
                if(!menuCollection.empty){
                    let arr = []
                    menuCollection.forEach(doc=>{
                        //console.log(doc.id, " => ", doc.data());
                        let obj = {
                            id: doc.id,
                            menu: doc.data()
                        }
                        arr.push(obj)
                    })
                    setMenuses(arr)
                }
                setLoading(false)
            }catch(e){
                console.log("Error getting documents: ", e);
            }
            
        }
        getMenu()
    },[])

    const onHandleDeleteSection = (index, iddoc) =>{
        setTextoLoading("Procesando solicitud...")
        setLoading(true)
        firebaseDB.collection("menu").doc(iddoc).get()
        .then(resp=>{
            //console.log(resp.data())
            let arr = resp.data().section
            arr.splice(index,1)
            //console.log(arr)
            const iD = menuses.findIndex(el=>el.id===iddoc)
            //console.log(iD)
            let arrM = [...menuses]
            //console.log()
            arrM[iD].menu.section = arr
            //console.log(arrM)

            firebaseDB.collection("menu").doc(iddoc).set({
                section: arr
            }, {merge: true})
            .then(()=>{                
                setLoading(false)
                setMenuses(arrM)
            })
            .catch(err=>{
                setLoading(false)
                alert("Error: " +err)
            })           
        })
        .catch(err=>{
            setLoading(false)
            alert("Error: " +err)
        })  
    }

    return (
        <Row>
            {loading && <Loading texto={textoLoading}/>}
            {
                (!loading && menuses.length) === 0 ? 
                <Col xs="12" md="12">
                    <Jumbotron className="my-5">
                        <div className="text-center">
                            <h2>Es hora de crear nuestro primer menú</h2>
                            <Link to="/menu/000nuevo" className="btn btn-info">Crear menú</Link>
                        </div>
                    </Jumbotron>
                </Col> :
                <Col xs="12" md="12" className="mt-5">
                    {!loading && <Link to="/menu/000nuevo" className="btn btn-info btn-sm mb-3">Nuevo menú</Link>}
                    <Row>
                        {
                            menuses.map((item,i)=>(
                                <Col xs="12" md="4" key={i}>
                                    <CardMenu item={item} onHandleDeleteSection={onHandleDeleteSection}/>
                                </Col>
                            ))                            
                        }
                    </Row>
                </Col>                
            }
        </Row>
    )
}