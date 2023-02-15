import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import {Link} from 'react-router-dom';
import { withRouter } from './withRouter';

class ListEmployeeComponent extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            employees: []
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }
    
    componentDidMount(){
        EmployeeService.getEmployees().then((res)=> {
            this.setState({employees:res.data});
        });
    }

    addEmployee(){
        //this.props.history.push("/add-employee")
        this.props.navigate("/add-employee/-1");
    }

    editEmployee(id){
        //this.props.navigate(`/update-employee/${id}`);
        this.props.navigate(`/add-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then((res) => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        })
    }

    viewEmployee(id){
        this.props.navigate(`/view-employee/${id}`)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Employee List</h2>
                <div className='row'>
                    <Link to ="/add-employee/-1">
                        <button className='btn btn-primary'>Add Employee</button>
                    </Link>
                   
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee 2</button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee => 
                                    <tr key= {employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                            <button style = {{marginLeft: "10px"}} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                            <button style = {{marginLeft: "10px"}} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(ListEmployeeComponent);