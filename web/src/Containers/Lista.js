import React, { Component } from 'react';
import File from './File'
import '../Assets/css/lista.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom'

export default class Lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      next: '',
      prev: '',
      pages: 0,
      total: 0,
      loading: true,
      page:1,
      search:'',
      orderby:'',
      sort:false,
      genders:[],
      filter:'',
      adding:false,
    };

    this.goToPage = this.goToPage.bind(this);
    this.getData = this.getData.bind(this);
    this.finder = this.finder.bind(this);
    this.orderBy = this.orderBy.bind(this);
    this.getGenders = this.getGenders.bind(this);
    this.filterBy = this.filterBy.bind(this);
    this.showAddUser = this.showAddUser.bind(this);
    this.hideAddUser = this.hideAddUser.bind(this);
  }

  showAddUser () {
    this.setState({
      adding: true,
    })
  }

  hideAddUser () {
    this.setState({
      adding: false,
    })
  }

  getGenders () {
    fetch("http://localhost.genetsis/rest/api/genders")
      .then(res => res.json())
      .then( 
        (result) => {
          var genders = [];
          result.map(function(item, pos) {
            genders.push(item.gender);
            return 0;
          })
          this.setState({
            genders: genders,
          })
        },
        (error) => {
        }
      )
  }

  getData( page, search, orderby, sort, filter ) {
    var url = "http://localhost.genetsis/rest/api/user?";
    if ( page > 0 ) {
      url += "&page="+page;
    }
    if (typeof search !== 'undefined' && search !== '') {
      url += "&search="+search;
    }
    if (typeof orderby !== 'undefined' && orderby !== '') {
      url +="&orderby="+orderby;
      if (sort === true) {
        url += "&sort=desc";
      }
    }
    if (typeof filter !== 'undefined' && filter !== '') {
      url +="&gender="+filter;
    }
    fetch(url)
      .then(res => res.json())
      .then( 
        (result) => {
          this.setState({
            data: result.data,
            next: result.next_page_url,
            prev: result.prev_page_url,
            pages: result.last_page,
            total: result.total,
            loading: false,
          });
        },
        (error) => {
        }
      )
  }

  goToPage ( event ) {
    let { orderby, sort, page, filter, search } = this.state;
    this.setState({
      page: parseInt(event.currentTarget.dataset.id),
    });
    this.getData(event.currentTarget.dataset.id, search, orderby, sort, filter);
  }

  finder ( event ) {
    let { orderby, sort, page, filter } = this.state;
    const { value } = event.target;
    this.setState({ 
      search: value,
      page:1,
    });
    if (value.length > 3) {
      this.getData(1, value, orderby, sort, filter);
      return ;
    } else if (value.length === 0) {
      this.getData(1, '', orderby, sort, filter);
    }
  }

  orderBy (event) {
    let { orderby, sort, page, search, filter } = this.state;
    if ( orderby === event.currentTarget.dataset.name ) {
      sort = !sort;
    } else {
      sort = false;
    }
    orderby = event.currentTarget.dataset.name
    this.setState({
      orderby: orderby,
      sort: sort
    });

    this.getData(page, search, orderby, sort, filter);
  }

  filterBy ( event ) {
    let { orderby, sort, page, search, filter } = this.state;
    var aFilter = event.currentTarget.dataset.name;
    if (aFilter === filter) {
      aFilter = '';
    }
    this.setState({
      filter: aFilter,
      page: 1,
    });
    this.getData(1, search, orderby, sort, aFilter);
  }

  componentDidMount() {
    let { page } = this.state;
    this.setState({
      loading: true,
    });
    this.getGenders();
    this.getData(page, '');
  }

  render() {
    let { data, loading, prev, next, pages, page, search, genders, filter, adding } = this.state;
    var pagesDiv = [],
        add = '';
    if (loading) {
      return <div>Loading...</div>;
    }

    var ini = page-3 > 0 ? page-3 : 1;
    var fin = page+3 < pages ? page+3 : pages;
    for (var i = ini; i <= fin; i++) {
      let style = 'normal'
      if (i === page) {
        style = 'round';
      }
      pagesDiv.push(<span className={"navigation-button "+style} data-id={i} key={i} onClick={ this.goToPage }>{ i }</span>);
    }

    var filters = [];

    genders.map( function (gender, i) {
        var active = "",
            aGender = "";
        if ( this.state.filter === gender ) {
          active = "active";
        }
        aGender = gender === "f" ? "Female" : "Male";

        filters.push(<span className={"filter-box "+active} key={i} data-name={ gender } onClick={ this.filterBy } > {aGender} </span>);
        return 0;
    }, this) 

    if (adding) {
      return (
        <div className="page">
          {<File cancel={this.hideAddUser} />}
        </div>
      )
    }

    return (
      <div className="page">
        <ReactCSSTransitionGroup
          transitionName="animation"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
        <div className="dataset">
          <div className="searchBox">
            <input className="search" autoFocus type="text" id="search" name="search" value={ search } onChange={this.finder} placeholder="Find..."/>
            <Link to='/datatable' activeClassName="active" replace> Using datatables</Link>
          </div>
          <div className="filters">
            <span className="title">Filter by genders:</span>
            { filters }
          </div>
          <div className="addBox">
            <img src="http://localhost.genetsis/assets/images/add.jpeg" alt="add" onClick={this.showAddUser} />
          </div>
          <div className="results">
            <table>
              <thead>
                <tr>
                  <th data-name="email" onClick={this.orderBy}>Email</th><th data-name="birthdate" onClick={this.orderBy}>Birthdate</th>
                  <th data-name="gender" onClick={this.orderBy}>Gender</th><th data-name="location" onClick={this.orderBy}>Location</th>
                </tr>
              </thead>
              <tbody>
                {data.map(function(item, index){
                  let gender = '---';
                  if (item.gender === 'm') {
                    gender = 'male'
                  } else if (item.gender === 'f') {
                    gender = 'female'
                  }
                  return <tr key={ index }><td>{item.email}</td><td>{item.birthdate}</td><td>{gender}</td><td>{item.location}</td></tr>;
                })}
              </tbody>
            </table>
          </div>
          <div className="navigation">
            <div className="prev-navigation">
              { page !== 1 ? <span className="navigation-button" data-id="1" onClick={this.goToPage}>&lt;&lt;</span> : ''}
              { prev ?  <span className="navigation-button" data-id={page-1} onClick={this.goToPage}>&lt;</span> : ''}
            </div>
            <div className="page-navigation">
              { pagesDiv }
            </div>
            <div className="next-navigation">
              { next ? <span className="navigation-button" data-id={page+1} onClick={this.goToPage}>&gt;</span> : '' }
              { page !== pages ? <span className="navigation-button" data-id={pages} onClick={this.goToPage}>&gt;&gt;</span> : ''}
            </div>
          </div>
        </div>
        </ReactCSSTransitionGroup>
      </div>      
    )
  }
}