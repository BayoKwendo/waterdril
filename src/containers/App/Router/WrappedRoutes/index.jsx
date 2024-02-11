import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../../Layout/index';
import '../../../../_assets/css/file.css';
import { Drillers } from '../../../Users/Drillers';
import Default from '../../../Dashboards/Default';
import { Services } from '../../../Users/Services';
import { Geologists } from '../../../Users/Geologists';
import { RequestWater } from '../../../Users/Requests';
import { UserProfile } from '../../../Users/UserProfile';
import { Customers } from '../../../Users/Customer';
import { GoogleMapComponent } from '../../../Users/GoogleMapComponent';
import { Owners } from '../../../Users/Owners';
import { Drivers } from '../../../Users/Drivers';
import { GoogleMapComponentOne } from '../../../Users/GoogleMapComponentOne';


export default () => (
  <div>
    <Layout />
    <div className="container__wrap">

      <Route path="/dashboard" component={Default} />

      <Route path="/googlemap" component={GoogleMapComponent} />


      <Route path="/googlemap_one" component={GoogleMapComponentOne} />

      <Route path="/driver" component={Drivers} />

      <Route path="/user_profile" component={UserProfile} />

      <Route path="/customer" component={Customers} />


      <Route path="/services" component={Services} />

      <Route path="/request_water" component={RequestWater} />

      <Route path="/test_units" component={Drillers} />

      <Route path="/geologist" component={Geologists} />


      <Route path="/owner" component={Owners} />



    </div>
  </div>
);
