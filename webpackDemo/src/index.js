import abc from './abc'
import css from './css/index.css'

const arr = [1,2,3]
const isES6 = () => console.log(...arr);
window.isES6 = isES6
//show()