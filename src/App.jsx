
 import { useState, useEffect } from "react";
 import Styles from "./Product.module.css";
 import Cards from "./Cards";
 import Status from "./Status";
 
 function App() {
   const [cards, setCards] = useState([]);
   const [formState, setFormState] = useState({});
   const [status, setStatus] = useState("all");
   const [editingCardId, setEditingCardId] = useState(null);
 
   useEffect(() => {
     const storedCards = JSON.parse(localStorage.getItem("cards"));
     if (storedCards) {
       setCards(storedCards);
     }
   }, []);
 
   useEffect(() => {
     localStorage.setItem("cards", JSON.stringify(cards));
   },[cards]);
 
   const handleSubmit = (e) => {
     e.preventDefault();
     if (editingCardId) {
       updateCard(formState);
     } else {
       createCard();
     }
     setFormState({});
     setEditingCardId(null);
   };
 
   const createCard = () => {
     const newCard = { ...formState, id: Date.now(), status: "Not Completed" };
     setCards([...cards, newCard]);
   };
 
   const updateCard = (updatedCard) => {
     const updatedCards = cards.map((card) =>
       card.id === updatedCard.id ? updatedCard : card
     );
     setCards(updatedCards);
   };
 
   const deleteCard = (cardId) => {
     setCards(cards.filter(({ id }) => cardId !== id));
   };
 
   const handleStatusChange = (cardId, newStatus) => {
     setCards((prevCards) =>
       prevCards.map((card) =>
         card.id === cardId ? { ...card, status: newStatus } : card
       )
     );
   };
 
   const handleStatus = (newStatus) => {
     setStatus(newStatus);
   };
 
   const handleEdit = (card) => {
     setFormState(card);
     setEditingCardId(card.id);
   };
 
   const statusTodo =
     status === "all"
       ? cards
       : status === "Completed"
       ? cards.filter((card) => card.status === "Completed")
       : cards.filter((card) => card.status === "Not Completed");
 
   return (
     <>
       <form onSubmit={handleSubmit}>
         <div className={Styles["input-heading"]}>My todo</div>
         <div className={Styles["input-box"]}>
           <input
             type="text"
             placeholder="Todo Name"
             name="name"
             value={formState.name || ""}
             onChange={(e) => setFormState({ ...formState, name: e.target.value })}
           />
           <input
             type="text"
             placeholder="Todo Description"
             name="description"
             value={formState.description || ""}
             onChange={(e) =>
               setFormState({ ...formState, description: e.target.value })
             }
           />
           <button type="submit" className={Styles["btn"]}>
             {editingCardId ? 'Update' : 'Add'} Todo
           </button>
         </div>
       </form>
       <div className={Styles["status-div"]}>
         <Status handleStatus={handleStatus} />
       </div>
       <div className={Styles["main"]}>
         {statusTodo.map((card) => (
           <Cards
             key={card.id}
             {...card}
             deleteCard={deleteCard}
             handleStatusChange={handleStatusChange}
             editCard={handleEdit}
           />
         ))}
       </div>
     </>
   );
 }
 
 export default App;