# 📝 Music Studio Web  
Music Studio is a streaming web interface connected to a blockchain app. Using the application developed in Next.JS, it is possible to view, edit, create and delete streaming content, such as songs, artists, albums and playlists.

## 👩‍💻 Technologies

This project uses lot of stuff as:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Mantine](https://mantine.dev/)

## 💻 Getting Started

First, install all the dependencies: 

```bash
npm install
# or
yarn 
```

And then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see Music Studio working.

## Commands

- `dev`: runs your application on `localhost:3000`
- `build`: creates the production build version
- `start`: starts a simple server with the build production code
- `lint`: runs the linter in all components and pages

### 💠 API Routes

 - `/`: Home Route. Here you can view the first contents of Songs, Artists, Albums and Playlist. 
 - `/songs`: Songs Page. Here you can view the lists of all songs created. You can also have access to its other actions:
   -  `/songs/:id`: You can view the information of an unique song. Such as title, album and artist.
   -  `/songs/update/:id`: You can access the form to update the song created to change its information.
   By clicking in a song component you have the option to update it or also delete it.
 - `/artists`: Artist Page. Here you can access all artists and also its other actions:
   -  `/artists/:id`: You can view the information of an unique artist. Such as their description, songs and albums in only one page.
   -  `/artists/update/:id`: You can access the form to update the artist created to change its information.
   By clicking in an artist component you have the option to update it or also delete it.
 - `/albums`: Albums Page. Here you can view the lists of all songs created. You can also have access to its other actions:
   -  `/albums/:id`: You can view the information of an unique album. Such as title and songs of this album.
   -  `/albums/update/:id`: You can access the form to update the album.
    By clicking in an album component you have the option to update it or also delete it.
 - `/playlists`: Playlists Page. Here you can access the playlists created and also its other actions:
   -  `/playlists/:id`: You can view the clicked playlist information. Such as their description and songs.
   -  `/playlists/update/:id`: You can access the form to update the information of the created playlist.
   By clicking in a playlist component you have the option to update it or also delete it.

## 💡 Learnings and improvements


