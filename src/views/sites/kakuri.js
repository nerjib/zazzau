import React,{useEffect, useState} from 'react';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import {features} from '../../data/kakuriData.json';
import './Map.css';
import 'leaflet/dist/leaflet.css';
//import Legend from './Legend'
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
//import { LayersTwoTone } from '@material-ui/icons';
//import { floor } from 'lodash';

//import { makeStyles } from "@material-ui/core/styles";

//import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

//const useStyles = makeStyles(styles);

//let kakuri = features

const Kakuri = (props)=>{
    const [onselect, setOnselect] = useState({});
    const [newval, setNewVal] = useState('');
    const [dataOdf, setDataOdf] =useState('')
    /* function determining what should happen onmouseover, this function updates our state*/
   // const classes = useStyles();

    const highlightFeature = (e=> {
    //    alert('kkk')
        var layer = e.target;
        const { LGAName, LGACode, ODF } = e.target.feature.properties;
        setOnselect({
            lga:LGAName,
            odf:ODF,
            code: LGACode          
        });
        layer.setStyle({
            weight: 1,
            color: "black",
            fillOpacity: 1
        });
    });
    const clickFeature = (e=> {
        //    alert('kkk')
            var layer = e.target;
            const { LGAName, LGACode, amount, plot } = e.target.feature.properties;
            alert(plot+ ' '+ amount)
            setOnselect({
                lga:LGAName,
                code: LGACode          
            });
            layer.setStyle({
                weight: 1,
                color: "black",
                fillOpacity: 1
            });
        });
      
    
    /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
    const resetHighlight= (e =>{
        setOnselect({});
      e.target.setStyle(style(e.target.feature));
     //  e.target.setStyle(style(status.features));

    })
    /* this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
     highlightFeature and resetHighlight*/
    const onEachFeature= (feature, layer)=> {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: clickFeature
            
        });
    //    layer.marker({icon:layer.divIcon({className:'ffff'})})
     //   var myIcon = layer.divIcon({className: 'my-div-icon'});
        // you can set .my-div-icon styles in CSS
        
       // L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
    }

    const mapPolygonColorToDensity=(density => {
        return density > 99
            ? '#fee5d9'
            : density > 69
            ? '#fcbba1'
            : density >49
            ? '#fc9272'
            : density > 24
            ? '#fb6a4a'
            : density >9
            ? '#de2d26'
            : '#00ff00';
    })

    useEffect(()=>{
        axios.get(`https://zazzau.herokuapp.com/api/v1/sites/plotsdetail/${props.layout}`)
        .then(res =>{
            let  kkk =  features
let layoutList=res.data
//alert(layoutList.length)
            Object.keys(kkk).map(e=>{
                for(let i=0;i<layoutList.length;i++){
                    if(kkk[e].properties.plot===layoutList[i].plotno){
                  //      alert(kkk[e].properties.amount)

                        kkk[e].properties.amount=layoutList[i].amount
                    }                       
                  }
             })
            setDataOdf(res.data)
            //setLoading(false)
          //  this.setState({projects: res.data})
        })
    },[])

    useState(()=>{
        let  kkk =  features
        //   alert(kkk.length)
         /*  Object.keys(kkk).map(e=>{
              for(let i=1;i<5;i++){
                  if(kkk[e].properties.LGAName===lgaList[i].lga){
                      kkk[e].properties.ODF=((lgaList[i].certified/lgaList[i].communities)*100)
                  }                       
                }
           })*/
    },[])
    const style = (feature => {
        return ({
         fillColor: feature.properties.plot==props.plot?'green':'blue',//mapPolygonColorToDensity(feature.properties.ODF),
         //   fillColor: mapPolygonColorToDensity(feature.properties.LGACode),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });
    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }
      const feature = features.map(feature=>{
        return(feature);
    });
    let newD={Lere:80,Giwa:100, Kudan:'100', Jaba:100}

    const updateValue=async()=>{
        props.history.push('/odfstatus')

    }

    useEffect(()=>{
        let kkk =  features
        //   alert(kkk.length)
           Object.keys(kkk).map(e=>{
           kkk[e].properties.ODF=newD[kkk[e].properties.LGAName]
          
           })
         

    },[])


   const handleChangeVal=(e)=>{
      const  {value}=e.target
        setNewVal(value)
    }
    return(
         <div className=''>
                              {props.layout+' '+props.plot}
                {onselect.lga && (
                    <ul className="census-info">
                       <li><strong>{onselect.plot}: { onselect.odf}%</strong></li><br/>
                      {/*}  <li>Total Population:{onselect.total}</li>
                        <li>Men:{onselect.male}</li>
                        <li>Women:{onselect.female}</li>
                        <li>Intersex:{onselect.intersex}</li>
                        <li>Population density:{onselect.density} people <br/> per square km</li>
                */}
                    </ul>
                )}
                <div >
               <MapContainer zoom={18}
                 scrollWheelZoom={true} 
                  style={mapStyle} 
                   center={[10.541312165263088,7.485681921243668]}>
                    <TileLayer
                        attribution=""
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    />
                   {feature && (
                    <GeoJSON data={feature} 
                    style={style} 
                    onEachFeature={onEachFeature}
                    />
                    
                    )}
                </MapContainer>
                </div>
        </div>

    )
}
export default Kakuri;