import React from 'react';
import axios from "axios";
import "./App.css";
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
  },
};
class App extends React.Component {
    constructor(props) {
        super(props);   
        this.closeModal = this.closeModal.bind(this);
        this.state = {
          modalIsOpen:false,
          name:'',
         username: '',
         email : '',
        address:'',
        phone:'',
        website:'',
        comapny:'',
        }
    }
   
    openModal(id){
        console.log(id); 
        this.setState({
          modalIsOpen:true});   
          axios.get("https://jsonplaceholder.typicode.com/users")
          .then(response => {
            // console.log("course list ", response);
            const chardata = response.data;
            const result = chardata.filter(chardata => chardata.id  == id);
          
            this.setState({
              name:result[0].name,
              username: result[0].username,
              email : result[0].email,
             address:result[0].address.city,
             phone:result[0].phone,
             website:result[0].website,
             comapny:result[0].company.name,
            });
          })
          .catch(error => {
            console.log(error);
          });  
    }
    closeModal(){
      this.setState({modalIsOpen:false});   
    }
   
    deletBtn(id){
        console.log(id);
        axios.delete("https://jsonplaceholder.typicode.com/users/posts/" + id)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    }
    handleChange = (e) => {
      this.setState({ [e.target.name] : e.target.value });
     
    }
    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/users")
          .then(response => {
            console.log("course list ", response);
            const chardata = response.data;
           
           let allChar = chardata.map((chardata,i) =>  (
            <tr  key={chardata.id}>
            <td>{chardata.id}</td>
            <td>{chardata.name}</td>
            <td>{chardata.username}</td>
            <td>{chardata.email}</td>
            <td>{chardata.address.city} {chardata.address.street}</td>
            <td>{chardata.phone}</td>
            <td>{chardata.website}</td>
            <td>{chardata.company.name}</td>
            <td>
            <button type="button"  onClick={() => this.openModal(chardata.id)} > Edit</button>
            <button type="button" onClick={() => this.deletBtn(chardata.id)}>Delete</button>
            </td>
          </tr>

            ));
            this.setState({
                charcard: allChar
            });
          })
          .catch(error => {
            console.log(error);
          });
          
        }
            render() {
         
        return (
          <div className="app-container">
       
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Website</th>
                <th>Company</th>
                <th>Actions
                </th>
              </tr>
            </thead>
            <tbody>
            {this.state.charcard}
            </tbody>
          </table>
          <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="empploye-head">
        <div className="Emp-head">
          Employee details
        </div>
        <button onClick={this.closeModal}>X</button> 
        </div>
        <input type="text" onChange={this.handleChange} value={this.state.name} name="name" placeholder="Name"></input>
        <input type="text" onChange={this.handleChange} value={this.state.username}  name="username" placeholder="Usernaame"></input>
        <input type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email"></input>
        <input type="text" value={this.state.address} onChange={this.handleChange} placeholder="Address"></input>
        <input type="text" value={this.state.phone} onChange={this.handleChange} placeholder="Phone"></input>
        <input type="text" value={this.state.website} onChange={this.handleChange} placeholder="Website"></input>
        <input type="text" value={this.state.comapny} onChange={this.handleChange} placeholder="Company"></input>
     
 
      </Modal>
      </div>
           )
    }
}

export default App;