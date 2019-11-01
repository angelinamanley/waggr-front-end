import LogInForm from "../components/LogInForm"
import SignUpForm from "../components/SignUpForm"
import Home from "../components/Home"
import WelcomePage from "../components/WelcomePage"

export const routes = [
    {
        title:'Home', 
        path: '/', 
        component: Home
    },
    {
        title:'Log in', 
        path: '/login', 
        component: LogInForm
    },
    {
        title:'Sign up', 
        path: '/signup', 
        component: SignUpForm
    }, 
    {   title: 'Log out', 
        path: '/logout',
        component:    props => {props.logout()
        return null }
    } 

]


