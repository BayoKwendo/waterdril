import React, { useEffect, Fragment } from 'react';
import Map from './Map';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import axios from 'axios';
import { CONFIG, baseURL } from '../../configs/exports';
import Select from "react-select";


export const GoogleMapComponent = () => {


    const [datamap, setDataMap] = React.useState([]);
    const [mtype, setDataType] = React.useState('test_pump');
    const [mdata, setDataM] = React.useState([]);
    const apiCall = () => {
        let url = baseURL + `service_portal`;
        axios.all([axios.get(url, CONFIG)]).then(axios.spread((branchResponse) => {
            setDataM(branchResponse.data.data)
        }))
    }

    useEffect(() => {

        apiCall()
        axios.get('https://driller-3a61b-default-rtdb.europe-west1.firebasedatabase.app/online_drivers.json')
            .then((response) => {
                axios.get(baseURL + 'user_driver_all?role=' + mtype)
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

    }, [datamap, mtype])


    const onSelectHandle = e => {
        setDataType(e.value)
    }

    return (
        <div style={{ marginTop: '-20px' }} >
            < >
                <div className="col-md-10-offset-1">
                    <div className="form-group">
                        <div className="col-md-12">
                            <label className="form-label">Select Service to Track</label>
                        </div>
                        <div className="col-md-4">
                            <Select
                                options={
                                    (mdata.length > 0 || mdata.length === 0) &&
                                    mdata.map((countyItem, i) => ({
                                        label: countyItem.name + " - " + countyItem.type,
                                        value: countyItem.type
                                    }))}

                                placeholder="Select Service (Default Test Units)"
                                autosize={true}
                                onChange={onSelectHandle}
                                className="selected"
                                menuPortalTarget={document.body}
                                name="namffe"
                            />
                        </div>

                    </div>
                </div>


                {datamap && datamap.length > 0 ?
                    <Map
                        center={{ lat: -1.286389, lng: 36.817223 }}
                        zoom={8}
                        places={datamap}
                    />
                    :
                    <h4>Loading...</h4>
                }
            </>
        </div >

    )

}