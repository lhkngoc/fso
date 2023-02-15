import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors{
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query{
        allBooks{
            title
            published
            author{
                name
            }
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBooks(
        $title:String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ){
        addBooks(title:$title,published:$published,author:$author,genres:$genres){
            title,
            published,
            author{
                name
            },
            genres
        }
    }
`
export const UPDATE_BORN = gql`
    mutation addBornAuthor(
        $name:String!
        $born:Int!
    ){
        editAuthor(name:$name,born:$born){
            name,
            born
        }
    }
`