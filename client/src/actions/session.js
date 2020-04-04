import axios from 'axios';

export const getQuestions = () => {
    return axios.get("/api/session/questions");
}

// record an onboarding session (i.e. series of questions)
export const recordSession = (id, questions, answers) => {
    let content = questions.map((q, index) => {
        q.answer = answers[index];
        return q;
    })

    return axios.post("/api/session", {
        id,
        content
    })
}

// get onboard session by user
export const getSession = (id) => {

    return axios.get("/api/session/user?id="+id)
}