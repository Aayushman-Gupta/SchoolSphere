import React, { useState, useEffect } from 'react';
import './Dashboard.css'
import { AreaChart, LineChart, PieChart,BarChart } from 'react-chartkick'
import 'chartkick/chart.js'

const Dashboard = () => {
    const [batchData, setBatchData] = useState([
        { batch: '10E', studentCount: 0 },
        { batch: '10H', studentCount: 0 },
        { batch: '11E', studentCount: 0 },
        { batch: '11H', studentCount: 0 },
        { batch: '12E', studentCount: 0 },
        { batch: '12H', studentCount: 0 }
    ]);
    const [chartData, setChartData] = useState([]);
    const [genderData, setGenderData] = useState([
      {gender:'Male',gender_count:0},
      {gender:'Female',gender_count:0},
      {gender:'Others',gender_count:0}
    ]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/student/api/students/count-by-class');
                const data = await response.json();
                console.log(data)
                setBatchData(data);
            } catch (error) {``
                console.error('Error fetching student data:', error);
            }
        };
        const fetchChartData = async () => {
          const response = await fetch('http://localhost:8000/student/api/students/count-by-date/');
          const data = await response.json();
          setChartData(data);
        };
        const fetchGenderData = async () => {
          const response = await fetch('http://localhost:8000/student/api/students/count-by-gender/');
          const data = await response.json();
          setGenderData(data);
        };
        fetchData();
        fetchChartData();
        fetchGenderData();

    },[]);

    const batchChartData = batchData.map(item => [item.batch, item.studentCount]);
    const genderChartData = genderData.map(item => [item.gender, item.gender_count]);
    const enrollmentChartData = chartData.map(item => [item.date, item.studentCount]);


  const totalStudents = genderData.reduce((total, current) => total + current.gender_count, 0);
  const maleStudents = genderData.find(item => item.gender === 'Male')?.gender_count || 0;
  const femaleStudents = genderData.find(item => item.gender === 'Female')?.gender_count || 0;
  const otherStudents = genderData.find(item => item.gender === 'Others')?.gender_count || 0;

    return (
    <>
     <div className="dashboard">
      <h2>School Dashboard</h2>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-value">{totalStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Male Students</h3>
          <div className="stat-value">{maleStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Female Students</h3>
          <div className="stat-value">{femaleStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Other</h3>
          <div className="stat-value">{otherStudents}</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Student Enrollment Over Time</h3>
          <LineChart
            data={enrollmentChartData}
            colors={["#3e95cd"]}
            library={{
              plugins: {
                legend: { display: false },
                title: { display: false }
              }
            }}
          />
        </div>

        <div className="chart-card">
          <h3> Student Gender Distribution</h3>
          <PieChart
            data={genderChartData}
            colors={["#3e95cd", "#8e5ea2", "#3cba9f"]}
            library={{
              plugins: {
                legend: { position: 'bottom' }
              }
            }}
          />
        </div>
      </div>

      <div className="chart-card full-width">
        <h3>Students by Class</h3>
        <BarChart
          data={batchChartData}
          colors={["#3cba9f"]}
          library={{
            plugins: {
              legend: { display: false }
            }
          }}
        />
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-time">2 hours ago</span>
            <span className="activity-text">New student registered - Sarah Johnson</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">3 hours ago</span>
            <span className="activity-text">Attendance updated for Grade 10</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">Yesterday</span>
            <span className="activity-text">New teacher profile added - Mr. Anderson</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">2 days ago</span>
            <span className="activity-text">Grade 8 exam results uploaded</span>
          </div>
        </div>
      </div>
    </div>
      </>
    );
};

export default Dashboard;

