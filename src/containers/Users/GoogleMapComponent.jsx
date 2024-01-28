import React, { useEffect, Fragment } from 'react';
import Map from './Map';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import axios from 'axios';
import { CONFIG, baseURL } from '../../configs/exports';


export const GoogleMapComponent = () => {


    const [datamap, setDataMap] = React.useState([]);


    useEffect(() => {


        axios.get('https://driller-3a61b-default-rtdb.europe-west1.firebasedatabase.app/online_drivers.json')
            .then((response) => {
                axios.post(baseURL + 'user_driver')
                    .then((allResp) => {
                        let data = [];

                        data.push(Object.assign(response.data));

                        if (allResp.data.data.length > 0 && data.length > 0) {
                            // 
                            // let p = JSON.parse(JSON.stringify(JSON.stringify(data).replace("[{", "[").replace("}]", "]")))

                            let mdata = [];

                            for (let x = 0; x < allResp.data.data.length; x++) {

                                if (data[0][allResp.data.data[x].id]) {
                                    let mname = { name: `Name: ${allResp.data.data[x].name}\nPhone: ${allResp.data.data[x].msisdn}\nID Number: ${allResp.data.data[x].id_number}\nMovement Status: ${allResp.data.data[x].movement_status}` }

                                    let mid = { id: allResp.data.data[x].id }
                                    let mlat = { latitude: data[0][allResp.data.data[x].id]['0000'].lat }
                                    let mlong = { longitude: data[0][allResp.data.data[x].id]['0000'].lng }
                                    mdata.push(Object.assign(mid, mname, mlat, mlong));

                                }
                            }

                            setDataMap(mdata)

                            console.log("ffjjfjffjjf ", datamap)

                        }
                    });

            }).catch(error => {
                console.log("ffjjfjffjjf ", error)
            });

    }, [datamap])
    return (
        <div style={{ marginTop: '-20px' }} >
            < >
                {datamap.length > 0 ?
                    <Map
                        center={{ lat: -1.286389, lng: 36.817223 }}
                        zoom={8}
                        places={datamap}
                    />
                    : null}
            </>
        </div >

    )

}