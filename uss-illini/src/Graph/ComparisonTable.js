import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardSubtitle,CardColumns,
    CardTitle, CardText, Table } from 'reactstrap';
import { Container, Row, Col, } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Plot from 'react-plotly.js';

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

export default class ComparisonTable extends React.Component {
  constructor(props) {
      super(props);
      this.radar = this.radar.bind(this);
      this.options = {
        defaultSortName: 'rating',  // default sort column name
        defaultSortOrder: 'desc'  // default sort order
      };
      this.state = {
          data : [{
              type: 'scatterpolar',
              r: [-1, -1, -1, -1, -1, -1],
              theta: ['Kills','Survival','Wins','Damage','Objective','Kills'],
              name: 'ilan',
          }],
          data2 : [{
              type: 'scatterpolar',
              r: [-1, -1, -1, -1, -1, -1],
              theta: ['Win Rate','Damage','XP','Plane Kills','Ship Kills','Win Rate'],
              name: 'ilan',
          }],
          combineddata : [],
          called : 0,
          data_arr : [],
          names: new Set(),
      };
  }

    radar(account_id, name){
        fetch('/users/radar', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({account_id: account_id}),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    var result = [res[0]['Kills'],res[0]['Survival'],res[0]['Wins'],res[0]['Damage'],res[0]['Objective'],res[0]['Kills']];
                    var dict = {};
                    for (var key in this.state.data[0]){
                        if(key == 'r'){
                            dict[key] = result;
                        }
                        else if(key == 'name'){
                            dict[key] = name;
                        }
                        else{
                            dict[key] = this.state.data[0][key];
                        }
                    }
                    var newData = this.state.data_arr;
                    var newNames = this.state.names;
                    if (newNames.has(dict['name'])){
                        return;
                    }
                    newNames.add(dict['name']);
                    newData.push(dict);
                    this.setState({data_arr: newData});
                    this.setState({names: newNames});
                }
                else{
                    //alert("No such player/ship found!");
                }
            })
    }

    componentWillReceiveProps(){
        var s = new Set();
        var data_arr = [];
        console.log(this.props.data);
        for(var i = 0; i < this.props.data.length; i++){
            this.radar(this.props.data[i].account_id, this.props.data[i].account_name);
        }
        var cnt = this.state.called + 1;
        this.setState({called: cnt})
    }

  render() {
      var data = this.props.data;
      var score = this.props.score;
      var set = new Set();
      var combineddata = [];
      var bardata = [];
      var maxdata = [0,0,0,0];
      for(var i = 0; i < data.length ; i++){
          if (data[i] && score[i] && !set.has(data[i]['nickname'])){
              set.add(data[i]['nickname']);
              combineddata.push({
                  account : data[i]['nickname'],
                  battles :  data[i]['battles'],
                  winrate : Math.round((data[i]['wins'] / data[i]['battles'])*100)/100,
                  rating : score[i],
                  averagedamage: Math.round((data[i]['damage_dealt'] / data[i]['battles'])*100)/100,
                  averagekills: Math.round((data[i]['frags'] / data[i]['battles'])*100)/100,
                  averageplanekills: Math.round((data[i]['planes_killed'] / data[i]['battles'])*100)/100,
                  averagexp: Math.round((data[i]['xp'] / data[i]['battles'])*100)/100,
                  maxdamage: data[i]['max_damage_dealt'],
                  maxkills:  data[i]['max_frags_battle'],
                  maxplanekills: data[i]['max_planes_killed'],
                  maxxp:  data[i]['max_xp'],
              });
              if(combineddata[i]['battles'] > maxdata[0]){
                  maxdata[0] = combineddata[i]['battles'];
              }
              if(combineddata[i]['winrate'] > maxdata[1]){
                  maxdata[1] = combineddata[i]['winrate'];
              }
              if(combineddata[i]['averagedamage'] > maxdata[2]){
                  maxdata[2] = combineddata[i]['averagedamage'];
              }
              if(combineddata[i]['averagekills'] > maxdata[3]){
                  maxdata[3] = combineddata[i]['averagekills'];
              }
          }
      }
      set = new Set();
      for(var i = 0; i < data.length ; i++){
        if (data[i] && score[i] && !set.has(data[i]['nickname'])){
            set.add(data[i]['nickname']);
            bardata.push({
               x: ['battles','winrate','ave dmg','ave kills'],
               y: [combineddata[i]['battles']/maxdata[0],combineddata[i]['winrate']/maxdata[1],combineddata[i]['averagedamage']/maxdata[2],combineddata[i]['averagekills']/maxdata[3]],
               name: data[i]['nickname'],
               type: 'bar',
            });
        }
      }
      let dataArr = Array.from(this.state.data_arr);
    return (
        <div>
            <BootstrapTable data={combineddata} height='504' scrollTop={ 'Bottom' } options={ this.options }>
                <TableHeaderColumn dataField='account' isKey >Account</TableHeaderColumn>
                <TableHeaderColumn dataField='battles' dataSort>Battles</TableHeaderColumn>
                <TableHeaderColumn dataField='winrate' dataSort>Win Rate</TableHeaderColumn>
                <TableHeaderColumn dataField='rating' dataSort>Rating</TableHeaderColumn>
                <TableHeaderColumn dataField='averagedamage' dataSort>Ave Damage</TableHeaderColumn>
                <TableHeaderColumn dataField='averagekills' dataSort>Ave Kills</TableHeaderColumn>
                <TableHeaderColumn dataField='averageplanekills' dataSort>Ave Plane Kills</TableHeaderColumn>
                <TableHeaderColumn dataField='averagexp' dataSort>Ave XP</TableHeaderColumn>
                <TableHeaderColumn dataField='maxdamage' dataSort>Max Damage</TableHeaderColumn>
                <TableHeaderColumn dataField='maxkills' dataSort>Max Kills</TableHeaderColumn>
                <TableHeaderColumn dataField='maxplanekills' dataSort>Max Plane Kills</TableHeaderColumn>
                <TableHeaderColumn dataField='maxxp' dataSort>Max XP</TableHeaderColumn>
            </BootstrapTable>
            <Row>
                <Col>
                    <Plot
                        data = {dataArr}
                        layout = {this.props.layout}
                        config = {{displayModeBar: false}}
                        style={{ width: "100%", height: "400px" }}
                    />
                </Col>
                <Col>
                    <Plot
                        data = {bardata}
                        layout = {{barmode: 'group'}}
                        config = {{displayModeBar: false}}
                        style={{ width: "100%", height: "400px" }}
                    />
                </Col>
            </Row>
        </div>

    );
  }
}
