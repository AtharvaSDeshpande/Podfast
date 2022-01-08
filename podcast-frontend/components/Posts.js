import Post from "./Post"

const posts = [
    {
        id: '1233',
        username: 'Gerry68',
        name: 'Anonymous',
        userImg: 'https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/WhatsApp%20Image%202021-12-30%20at%2021.43.49.jpeg?alt=media&token=eb55102a-7f29-41df-a016-23e8d5f58c6e',
        img: 'https://cdn.fakercloud.com/avatars/buddhasource_128.jpg',
        caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repudiandae nobis dolores consectetur autem architecto obcaecati minus reiciendis temporibus. Quibusdam cumque suscipit porro blanditiis quisquam officia, delectus accusantium voluptatum aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repudiandae nobis dolores consectetur autem architecto obcaecati minus reiciendis temporibus. Quibusdam cumque suscipit porro blanditiis quisquam officia, delectus accusantium voluptatum aut.',
    },
    {
        id: '1234',
        username: 'dsca',
        name: 'Anonymous',
        userImg: 'https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/WhatsApp%20Image%202021-12-30%20at%2021.43.49.jpeg?alt=media&token=eb55102a-7f29-41df-a016-23e8d5f58c6e',

        img: 'https://cdn.fakercloud.com/avatars/manigm_128.jpg',
        caption: 'Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo Hellooo ',
    },
    {
        id: '1234',
        username: 'Davion15',
        name: 'Anonymous',
        userImg: 'https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/WhatsApp%20Image%202021-12-30%20at%2021.43.49.jpeg?alt=media&token=eb55102a-7f29-41df-a016-23e8d5f58c6e',

        img: 'https://cdn.fakercloud.com/avatars/goddardlewis_128.jpg',
        caption: '// Sit tenetur obcaecati eveniet accusamus similique alias optio error at? Ducimus ullam, ipsa recusandae porro eum pariatur? Libero est repellendus sapiente labore error soluta praesentium omnis! Nesciunt rem explicabo temporibus!',
    },
    {
        id: '1235',
        username: 'Lesley7',
        name: 'Anonymous',
        userImg: 'https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/WhatsApp%20Image%202021-12-30%20at%2021.43.49.jpeg?alt=media&token=eb55102a-7f29-41df-a016-23e8d5f58c6e',

        img: 'https://cdn.fakercloud.com/avatars/jodytaggart_128.jpg',
        caption: 'Nemo soluta a voluptatum, hic consectetur, debitis ad cum earum nesciunt pariatur quod iure odit deserunt necessitatibus sunt, quia magni. Quia rerum doloribus magnam aliquam perspiciatis vitae porro laudantium odio.',
    },
    {
        id: '1235',
        username: 'Lesley7',
        name: 'Anonymous',
        userImg: 'https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/WhatsApp%20Image%202021-12-30%20at%2021.43.49.jpeg?alt=media&token=eb55102a-7f29-41df-a016-23e8d5f58c6e',

        img: 'https://cdn.fakercloud.com/avatars/jodytaggart_128.jpg',
        caption: 'Nemo soluta a voluptatum, hic consectetur, debitis ad cum earum nesciunt pariatur quod iure odit deserunt necessitatibus sunt, quia magni. Quia rerum doloribus magnam aliquam perspiciatis vitae porro laudantium odio.',
    },
    {
        id: '1235',
        username: 'Lesley7',
        name: 'Anonymous',
        userImg: 'https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/WhatsApp%20Image%202021-12-30%20at%2021.43.49.jpeg?alt=media&token=eb55102a-7f29-41df-a016-23e8d5f58c6e',

        img: 'https://cdn.fakercloud.com/avatars/jodytaggart_128.jpg',
        caption: 'Nemo soluta a voluptatum, hic consectetur, debitis ad cum earum nesciunt pariatur quod iure odit deserunt necessitatibus sunt, quia magni. Quia rerum doloribus magnam aliquam perspiciatis vitae porro laudantium odio.',
    },
    {
        id: '1235',
        username: 'Lesley7',
        name: 'Anonymous',
        userImg: 'https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/WhatsApp%20Image%202021-12-30%20at%2021.43.49.jpeg?alt=media&token=eb55102a-7f29-41df-a016-23e8d5f58c6e',

        img: 'https://cdn.fakercloud.com/avatars/jodytaggart_128.jpg',
        caption: 'Nemo soluta a voluptatum, hic consectetur, debitis ad cum earum nesciunt pariatur quod iure odit deserunt necessitatibus sunt, quia magni. Quia rerum doloribus magnam aliquam perspiciatis vitae porro laudantium odio.',
    },
    {
        id: '1235',
        username: 'Lesley7',
        name: 'Anonymous',
        userImg: 'https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/WhatsApp%20Image%202021-12-30%20at%2021.43.49.jpeg?alt=media&token=eb55102a-7f29-41df-a016-23e8d5f58c6e',

        img: 'https://cdn.fakercloud.com/avatars/jodytaggart_128.jpg',
        caption: 'Nemo soluta a voluptatum, hic consectetur, debitis ad cum earum nesciunt pariatur quod iure odit deserunt necessitatibus sunt, quia magni. Quia rerum doloribus magnam aliquam perspiciatis vitae porro laudantium odio.',
    }
]

function Posts() {
    return (
        <div>
            {posts.map((post)=>(
                <Post  id = {post.id} img = {post.img} username = {post.username} userImg = {post.userImg} caption = {post.caption}/>
            ))}
            
        </div>
    )
}

export default Posts
// Post
// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ut vero aspernatur cumque ipsa quam culpa ipsum sunt magni beatae totam sint cum labore ea, quis pariatur? Eum, porro harum?
// Aut vero eos, ut asperiores et quaerat error officiis iusto repellat, aliquid recusandae ex fuga commodi harum quisquam quam minima est nemo architecto impedit distinctio veritatis, nobis quia atque. Voluptatibus!
// Eum necessitatibus aperiam quo. Voluptatum quasi hic eligendi quos cum nostrum, nihil harum accusamus ex ipsam sapiente, sit blanditiis deleniti beatae officiis rerum est labore assumenda tempora iure impedit quaerat.
// Quae excepturi ipsa fugiat dignissimos temporibus soluta minus nesciunt quam illum. Omnis illum est dolor repellat asperiores amet nobis nam esse ut animi, veritatis sed cupiditate? Earum voluptas quas magni?
// Maiores, quidem sequi consequatur, quasi accusantium, officia laudantium id consequuntur atque nostrum rerum quod eius deserunt a? Nostrum laboriosam quis sit magnam? Quasi dolor omnis fuga cum in vitae commodi.
// Quod eligendi odio ipsam incidunt nobis, ratione eaque veritatis amet iste aliquam aut voluptatum facere qui ad voluptas magni non culpa minus vero omnis accusantium alias obcaecati libero assumenda. Magni?
// Voluptas, maiores vel unde soluta quas repellat voluptatum natus eos quos fugiat aut accusantium quo, est excepturi provident labore! Commodi esse inventore perspiciatis beatae ducimus ullam ut nam, incidunt explicabo.
// Recusandae tempora aliquam quos minima incidunt, nulla corrupti odio, pariatur reprehenderit asperiores totam delectus. Iure, ex ab illum cum quod eos illo, incidunt voluptatem fugit molestiae consequatur, dolorem sit fugiat.
// Nemo soluta a voluptatum, hic consectetur, debitis ad cum earum nesciunt pariatur quod iure odit deserunt necessitatibus sunt, quia magni. Quia rerum doloribus magnam aliquam perspiciatis vitae porro laudantium odio.
// Sit tenetur obcaecati eveniet accusamus similique alias optio error at? Ducimus ullam, ipsa recusandae porro eum pariatur? Libero est repellendus sapiente labore error soluta praesentium omnis! Nesciunt rem explicabo temporibus!