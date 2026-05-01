import React from "react";

function Dashboard({ name, email, password }) {

    const styles = {
        container: {
            minHeight: "100vh",
            background: "#0f172a",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "sans-serif"
        },
        card: {
            background: "#1e293b",
            padding: "30px",
            borderRadius: "12px",
            width: "320px",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        },
        title: {
            fontSize: "22px",
            marginBottom: "20px",
            textAlign: "center"
        },
        field: {
            marginBottom: "15px"
        },
        label: {
            fontSize: "12px",
            opacity: 0.7
        },
        value: {
            fontSize: "16px",
            marginTop: "4px"
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Dashboard</h2>

                <div style={styles.field}>
                    <div style={styles.label}>Name</div>
                    <div style={styles.value}>{name}</div>
                </div>

                <div style={styles.field}>
                    <div style={styles.label}>Email</div>
                    <div style={styles.value}>{email}</div>
                </div>

                <div style={styles.field}>
                    <div style={styles.label}>Password</div>
                    <div style={styles.value}>{password}</div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;