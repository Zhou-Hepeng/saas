"use strict";

import React from 'react';
import {Tool,Alert} from '../../tool.js';
import './brand.less';


class Sidebar extends React.Component{
    constructor(props) {
      super(props);
      this.state ={
        visible:false,
        active:false,
        brandid:'',
        toastTimer:'',
        L:[],
        R:[]
      }
      this.closeSold = this.closeSold.bind(this);
      this.upDatas = this.upDatas.bind(this);
      this.Liclick = this.Liclick.bind(this);
    }
    componentDidMount(){
        let allbrandlist = JSON.parse(Tool.localItem('allbrandlist'));
        var AZ = [];
        var BZ = [];
        for(let i=0;i < allbrandlist.allbrandlist.length; i++){
          let item = allbrandlist.allbrandlist[i].firstnameletter;
          let her = AZ.indexOf(item);
          if ( her === -1) {
            AZ.push(item);
          }
          for(let j=0; j< AZ.length; j++){
            BZ[j] = [];
          }
        }
        for(let i=0;i < allbrandlist.allbrandlist.length; i++){
          let json = {
                        'brandid':allbrandlist.allbrandlist[i].brandid,
                        'brandname':allbrandlist.allbrandlist[i].brandname
                      };
          let item = allbrandlist.allbrandlist[i].firstnameletter;
          let her = AZ.indexOf(item);
          if(her !== -1 ){
            BZ[her].push(json);
          }
        }
        //console.log(AZ,BZ);
        this.setState({
          L:BZ,
          R:AZ
        });
        let self = this;
        [].forEach.call(document.querySelectorAll('#sidebar'), function (el) {  
          el.addEventListener('touchend', function(e) {
            var x = e.changedTouches[0].pageX;
            if( x < 68 ){
                self.closeSold();
            }
          }, false);
        });
        
        //touchstart
        [].forEach.call(document.querySelectorAll('#index_nav'), function (el) {  
          el.addEventListener('touchstart', function(e) {
            this.setAttribute('class','nav');
          }, false);
        });
        //touchmove
        [].forEach.call(document.querySelectorAll('#index_nav'), function (el) {  
          el.addEventListener('touchmove', function(e) {
                let y = e.changedTouches[0].pageY - this.getBoundingClientRect().top;
                let Nums = this.querySelectorAll('li').length;
                let ContHeight = this.getBoundingClientRect().height;
                let target;
                if(y > 0 && y < ContHeight){
                    target = this.children[Math.round(y/Nums)];
                }
                self.showScale(target.innerHTML);
          }, false);
        });
        //touchend
        [].forEach.call(document.querySelectorAll('#index_nav'), function (el) {  
          el.addEventListener('touchend', function(e) {
            this.removeAttribute('class');
          }, false);
        });
    }
    Liclick(e){
      this.showScale(e.target.innerHTML);
    }
    showScale(val){
        clearTimeout(this.state.toastTimer);
        this.UlScroll(val);
        var Scale = document.getElementById('index_selected');
            Scale.innerHTML = val;
            Scale.style.display='block';
            setTimeout(function(){
                Scale.classList.add('show');
            },10);
            this.state.toastTimer = setTimeout(function(){
                Scale.classList.remove('show');
                Scale.style.display='none';
            },500);
    }
    UlScroll(el){
        var goUl = document.getElementById(el);
        var Uls = document.querySelector('.sidebar-container');
        var ulHeight = goUl.parentNode.offsetTop;
        Uls.scrollTop = ulHeight - 44;
    }
    upDatas(e){
      //console.log(e.target,e.target.title);
      let tit = e.target.title;
        this.setState({
          brandid:e.target.title,
          visible:false
        }, ()=> this.props.onChange(tit));
    }
    closeSold(){this.setState({visible:false});}
    componentWillReceiveProps(nextProps) {
      if(typeof(nextProps.Datas) == 'number'){
        this.setState({
          visible: true
        });
      }
    }
    render(){
       const {visible,active,L,R} = this.state;
       let self = this;
       return(
          <div>
           <aside className={visible?"sidebar visible":"sidebar"} id="sidebar">
              <header>
                  <span>品牌筛选</span>
                  <span className="close" id="sidebar_close"  onClick={this.closeSold}></span>
             </header>
             <div className="sidebar-container">
                <div className="sidebar-module">
                   <ul><li><a href="javascript:;" title="" onClick={self.upDatas}>所有品牌</a></li>
                   </ul>
                </div>
                {R.map(function(e,indexs){
                    return(
                      <div className="sidebar-module" key={indexs}>
                         <header id={e}>{e}</header>
                         <ul>
                            {L[indexs].map(function(ele,index){
                                return(
                                    <li key={index}>
                                       <a href="javascript:;" title={ele.brandid} onClick={self.upDatas}>
                                           {ele.brandname}
                                       </a>
                                    </li>
                                  )
                              })
                            }
                         </ul>
                      </div>
                    )
                  })
                }
            </div>
            <aside className="scale" id="index_selected">A</aside>
            <ul id="index_nav">
              {R.map(function(e,indexs){
                  return(
                   <li key={indexs} onClick={self.Liclick}>{e}</li>
                 )})
              }
            </ul>
          </aside>
        </div>
        )
    }
}

export default Sidebar 
