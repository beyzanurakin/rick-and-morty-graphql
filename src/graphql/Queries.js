import { gql } from '@apollo/client'

export const GET_CHARACTERS_QUERY = gql`
  query ($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        next
      }
      results {
        id
        name
        image
        location {
          name
        }
      }
    }
  }
`
