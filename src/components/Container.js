import React, { Component } from 'react'
import GoogleMapsContainer from './GoogleMapsContainer'
import DataWrapper from './DataWrapper'
import SearchInput from './SearchInput'
import superagent from 'superagent'
import { FetchBadIp, FetchGeoIp } from '../api/apility'

class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldVal: "",
            data: {},
            address: "",
            latitude: null,
            longitude: null,
            found: false,
            hostname: "",
            continent: "",
            country: "",
            region: "",
            city: "",
            postal: "",
            timeZone: "",
            asName: "",
            asNumber: "",
            asCountry: "",     
        };

        this.ipSearch = this.ipSearch.bind(this);
    }

    componentDidMount() {
        this.loadInitialData();
    }

    loadInitialData(){
        const badIpUrl = "https://api.apility.net/badip/8.8.8.8?token=" + process.env.REACT_APP_APILITY_KEY;

        superagent
        .get(badIpUrl)
        .query(null)
        .set('Accept', 'text/json')
        .end((error, response) => {

            if(response.ok){

                this.setState({
                    found: true
                })
            }
            else
            {
                this.setState({
                    found: false
                })
            }
        })

        /*FetchDummyBadIp()
        .then( (res) => {
            if(res.ok){
                this.setState({
                    found: true
                })
            }
            else
            {
                this.setState({
                    found: false
                })
            }
        })*/

        const geoIpUrl = "https://api.apility.net/geoip/8.8.8.8?token=" + process.env.REACT_APP_APILITY_KEY;

        /*FetchDummyGeoIp()
            .then( (data) => {

                const ipData = data.ip;

                this.setState({
                    ipData: ipData,

                    address: ipData.address,

                    latitude: parseFloat(ipData.latitude),

                    longitude: parseFloat(ipData.longitude),

                    hostname: ipData.hostname,

                    continent: ipData.continent,

                    country: ipData.country,

                    region: ipData.region,

                    city: ipData.city,

                    postal: ipData.postal,

                    timeZone: ipData.time_zone,

                    asNumber: ipData.as.asn,

                    asName: ipData.as.name,

                    asCountry: ipData.as.country
                })
            })*/

            superagent
            .get(geoIpUrl)
            .query(null)
            .set('Accept', 'text/json')
            .end((error, response) => {

                const data = response.body.ip

                this.setState({
                    data: data,

                    address: data.address,

                    latitude: parseFloat(data.latitude),

                    longitude: parseFloat(data.longitude),

                    hostname: data.hostname,

                    continent: data.continent,

                    country: data.country,

                    region: data.region,

                    city: data.city,

                    postal: data.postal,

                    timeZone: data.time_zone,

                    asNumber: data.as.asn,

                    asName: data.as.name,

                    asCountry: data.as.country
                })
            })
        }

        ipSearch(val){

            FetchBadIp(val)
            .then( (res) => {

                if(res.ok){
                    this.setState({
                        found: true
                    })
                }
                else
                {
                    this.setState({
                        found: false
                    })
                }

            })

            FetchGeoIp(val)
            .then( (data) => {

                const searchData = data.ip;

                this.setState({
                    ipData: searchData,

                    address: searchData.address,

                    latitude: parseFloat(searchData.latitude),

                    longitude: parseFloat(searchData.longitude),

                    hostname: searchData.hostname,

                    continent: searchData.continent,

                    country: searchData.country,

                    region: searchData.region,

                    city: searchData.city,

                    postal: searchData.postal,

                    timeZone: searchData.time_zone,

                    asNumber: searchData.as.asn,

                    asName: searchData.as.name,

                    asCountry: searchData.as.country
                })
            })
        }

        render (){

            const center = {
                lat: this.state.latitude,
                lng: this.state.longitude
            }

            return (
                <div>
                <SearchInput onSubmission={this.ipSearch} />

                <div style={{width: '100%', height: '30vh', background: 'grey'}}>
                <GoogleMapsContainer center={center} zoom={10} />
                </div>

                <DataWrapper
                found={this.state.found}
                address={this.state.address}
                hostname={this.state.hostname}
                continenet={this.state.continent}
                country={this.state.country}
                region={this.state.region}
                city={this.state.city}
                postal={this.state.postal}
                longitude={this.state.longitude} 
                latitude={this.state.latitude}
                timeZone={this.state.timeZone} 
                asNumber={this.state.asNumber}
                asName={this.state.asName}
                asCountry={this.state.asCountry}
                />
                </div>
                )
            }
        }

        export default Container;
