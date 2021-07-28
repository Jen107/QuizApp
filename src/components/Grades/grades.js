import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Firebase/FirebaseInit';

export default function Grades() {
    const firebase = useFirebase();
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase.grades().once('value', (snapshot) => {
            const data = snapshot.val();
            const sortedGrades = formatGradeData(data);
            setGrades(sortedGrades);
            setLoading(false);
        });
    });

    const formatGradeData = (firebaseGrades) => {
        const grades = [];

        for (let key in firebaseGrades) {
            const val = firebaseGrades[key];
            val['key'] = key;
            grades.push(val);
        }

        return grades
            .sort((grade1, grade2) => grade2.grade - grade1.grade)
            
    };

    return (
        <>
            {loading && <div id="loader"></div>}
            {!loading && (
                <>
                    <h1>Student Grades</h1>
                    <div id="gradesList">
                        {grades.map((record) => (
                            <li key={record.key} className="gradesList">
                                {record.name} - {record.grade}
                            </li>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}