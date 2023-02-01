import catBkg from '../images/catBackgrnd.png';
import Cards from './Crads.js'
import addingPost from '../images/adding-post.png'

function Main() {


    return(
        <div className="main-top"> 
            <section>
                <img src={catBkg} alt="mainCat" id="mainCat"></img>
            </section>
            <div id='adding-user-post'>
                <img src={addingPost} alt="adding post" id="adding"></img>
            </div>
            <h2>Cards</h2>
            <Cards />

            
            

        </div>
    );
}

export default Main;