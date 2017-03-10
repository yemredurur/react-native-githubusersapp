/**
 * Created by ydurur on 06/03/17.
 */

var Api = {
    getBio(username){
        username = username.toLowerCase().trim();
        var url = 'https://api.github.com/users/'+username;
        console.log('url',url);
        return fetch(url).then((res) => res.json());
    },
    getRepos(username){
        username = username.toLowerCase().trim();
        var url = 'https://api.github.com/users/'+username+'/repos';
        return fetch(url).then((res) => res.json());
    },
    getNotes(username){
        username = username.toLowerCase().trim();
        var url = 'https://shining-torch-9442.firebaseio.com/githubapp/'+username+'.json';
        return fetch(url).then((res) => res.json());
    },
    addNotes(username, note){
        username = username.toLowerCase().trim();
        var url = 'https://shining-torch-9442.firebaseio.com/githubapp/'+username+'.json';
        return fetch(url,{
            method: 'post',
            body: JSON.stringify(note)
        }).then((res) => res.json());
    }
}

module.exports = Api;