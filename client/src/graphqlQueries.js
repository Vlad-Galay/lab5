export default {
    CREATE_COMP: `
      mutation CreateComp($mark: String!, $model: String!, $year: String!) {
        createComp(compInput: {mark: $mark, model: $model, year: $year}) {
          id
          mark
          model
          year 
        }
      }
    `,
    FETCH_COMPS: `
     query {
       getComps {   
         id
         mark
         model
         year
        }     
     }
     `,
    DELETE_COMP: `
     mutation DeleteComp($id: ID!) {
       deleteComp(id: $id) {
         id   
       }
     }
   `,
    UPDATE_COMP: `
      mutation UpdateComp($id: ID!, $mark: String!, $model: String!, $year: String!) {
      updateComp(id: $id, mark: $mark, model: $model, year: $year) {
        id
        mark
        model
        year
     }
   }
  `
  };
  