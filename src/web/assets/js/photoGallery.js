// photoGallery from http://ashleydw.github.io/lightbox/

//links to/from this file:
    //layout.html MODIFIED (head script & body script),
    //index.html MODIFIED (script link to this file)
    //ekko-lightbox.css ADDED (also adds some custom tags - photoGallery)

(function() {
    'use strict';
    var numOfPhotos = 2; //USER DEFINED - photos per "gallery," ** auto updates bs column width below

        //links from: https://photos.google.com/share/AF1QipOpe6d2s8l_8DcsHxw4P65QGIo_EiLwWVES6lDvEsIh4Pl0_iUYO0pTf_zDkX7zVA?key=b0hLLU5UajczUjBOakY0TVBYVk5GdngtQW1QYU1R
        //description - inserted as alt and modal title
    var photos = [
        [
            "https://lh3.googleusercontent.com/hnApGApYkCYsiKLQInQQ3yNZpnYt8PPnHP5m8vu6NE2V5m_Eatj6B0RWwgOLqsUOqQaZbpuop3SNUYXPH3v0CJHmJj6LPZDfCXJXxtiQDbUotnmZ8VDPvcV9PBTqJmcW8EUUR8cdpZMLCUUs_21Svvm55zMB6xZa_qKBDkdpB1UFCz6XGL5VCXCzICy7EH1mQMWDkXpdoJKnszmDSH7B0CAqRP7a5iH32auCGtMnmKVGrZ4zVKkIzEb7t9Al_vQNq9wi7Rhk5XjQQNVoMcLCJsB8VKmwh3dtuC6nHLMO3E25b_O_OZBw4aPQVZ9-XMcJzlg2S1gyyDbZ0gmLdgAY07zz-FgTUU8NRLHv7imF3kfDFtcNEYvYjFHzW28M03Vew4f3ShHT3cwH5zJI-DxsiuKDDOoWFMDfbU9YM2YmqX2pOuOi9DBgebigMqEaQJSEmIkTqW55osZQMJvhwNNuqGj_T-Si7fCA8sfuIalupxhnLFwdjlW8egZZdy--UI4_GFU6I7RPSvjmWytfQkXvUH7uqpOjDmxG1es_-j3rYRExe2efMTDL8lGK1uUTxHF6I_w47btXCIwoPu8rSf4F9SAby5IN8Mo=w1167-h778-no",
            "Welcome to BarcampGB"
        ],[
            "https://lh3.googleusercontent.com/1TcoV79LjXC8X8EG3oQIF_k6ueJnyZLXvOFTVbl1WFiQ4KQCYxO7HuzhehFNRvHQ2PF71BhO8LqeSDkbIecS0Zp8z8xm4GaP0tvoQ6IkFhCt8TBcs33eJdWOJUjiXr7ChoD4HeaCvgyXNOO6YkowYAnCTaZf-8j7g1SrZB379v6BScu_XTf56AZlztkzYqbZfyGTdqbCxDRpeKABXIIRIuvHwLW5yceRoOHqjlQ9zOEfSggy-KaEBS74BZWiGDkfKc_-_IZosOIohYfoyoX-HaMEOiL6oDtMxj7E-VqNMLpPK25gmq2Kb-yUDdP5rVqvQGirZMKqi0D6xBk1dKDYLxVPprF0Rawgv7hXpoAM7otE3gaZJcCAyV5owLNOo-36Rhp5UFV9apJw0BVBcqoCMclv2z2Y1BuS4y8n2_TeXdO6oj8peIU-faUhm2gNEBm9DloYNNQfWvSHg-lDyV1RTDsQfU5Iile5kLSIZOE6L8Cx8m5FIZN1xmbl-lvPiwYSICQ9EpFub5Yfd19qOnqjG4uA1dBvYg_0gyQwGLG3av-2m-iQxdu_fsNWSuEN9tpGJFISzk1sMmrKoVuAPBfdNd5lGup00tM=w1167-h778-no",
            ""
        ],[
            "https://lh3.googleusercontent.com/uEs5bbsd68u2_UCAT3WCx2r_fnLNhff9k4NtgL8fce_APFhDR92dwT1Y9SSK2vFpSsDN0xmHAd-ZawI_Y6p2C2tkaNBdM4-BEfcq6FCgSm_LrWhoB1hN-JQYWwh50s1nrD-cbiCERpSqxPChDzFelbvea_Qhq1t0BsGlUc0FGwdmEHliUjwYGfGeTO1ynSC83FqSXjkfTj6TwQxk5BiPuQcyqT0j4p65TMrtSnhcQZZmJBDswQ8rHWC0UJjnUTzc4ez89o78wxBWFvgm3GzLoaR1bgnKGCJ5HM568wYRVew8wjn2N0eBqwxz8ekz4Y1A-abvKvSUF5jCmNDN4lM_x1vKHtftVfle3yQ8x4HHDSU0TLfAJUTQTG5NNAE-6WIw_-1n4qYXzjuXA5BQRzy3-RkoxuwObpQ03aOIOqr7uKqApSeVEuGCg_a64stvSTwkT9TM9egPCnjgG3olKmUhIM3ot8h5cg1GUQdOi6A8cBqO8qv4dOO61U8W-RQbOBUs3uA59wej2X5cg6pmIefyd60zRBpT_kNjYzgz7Ws9KW5UHDU-Zq8XpJoD2zE1xZOaLf-VrRW6OkFqxQMbFQpRfFyZ2GICzUg=w1167-h778-no",
            ""
        ],[
            "https://lh3.googleusercontent.com/-AsaBcFXHnxOnFm8SofT31aAhvNuAlUcTSq2CiliLUl75E6IYWCqZbMkj4YMKxLyYIMLT_sHDvlK7n6sRr5NijpQ_wOcH35baoMJf5px-dzO7Ot1wILAuXVfj4L_AlWvlSWOmhETdxGiY_N48QkrKNCQFas1uxDlpoiFVORML5uAsTZxfE11xgdIJzH47ehBmZAjM9np3rjk7w1Gv8-QFGj6XOR7_CSWn2GeyloEyhU4ADxvsvWl1-SD9Xk2r9Kif11c1l8MJCQam4DTimRmBqSlkZ_p205tcF64mVneH2CM1emPTDO9eP_bKdcgm48o7qi8t6YvRzkdyMawZvJYnizw6issi45O-U1u92CxMLREG_I386D5XN9JlEk9N5UWJeoXAilJWEUjfAhTLLtpK2v7y3RQoXdCha3_FPYbtsYsN9pSEnWra80WNoS8_imngcS159BjqVUrDhwbfSq2hKSP5nm1PVVoKR6m9BaV1lwJmNyRi0Jh-H8KcCEPfYFfqY6H89IAvN-4Y95NIyq_yeZwdwJiSeJfwlApIzIZ4Xoc3YAsCLHIWzTiaZyeiuapIuR--R1iTaV4W4EftnVTxfTEBZb3EXk=w1167-h778-no",
            ""
        ],[
            "https://lh3.googleusercontent.com/yjMY2eSnS7UM-uUA7N3g7WgE-iAb4TwQ4JmItTOvpSIZ5AJptFYEEnkUGh-SS2Vz8ERlmd2naHH0rDHhFW0_J3PkjCiomgnQs7tXuassj-gs06ytGnPQG8v1miFxQrA64C4YVM4KoavmpupPfvRHI1B8kzfEzydPajTmucvjHwKZgpn6vQ-4UNvy1QwOOe-unOEGfH5Evrd0bySPUOcgldPuGNhZHEYz2hd5VmkSLZAXQ1BzvmpmnDr2lG1bPAHbP1HUp97a9BJHdQ1QGHiosjbp-O9iRQy3SUqn4uLFJMMXatWr0yjixicF8WSxuq4D96wludGitfgFbf0-wI6ouo7EUhBMhzmJHpBxM_G46ynahT_w7dVp1QhX4GPb-hZ1AbcvGapp19kyPB0pMEqRUw5Ue7H3wQsIAbR8jB0d3UR7n6pVSFBnXIf89ll1B0lswWhin0c3q01O71XTAwuR2uv7NMQ-TNKVMv_SuS0qinObKueBbI_S6_gS2eUBZ8ervsRE3McJ_F0xObltITkq44AWUA9zM2y-jXejtAYC1p6OCznxWXr5Dwk9YlsLZriuYamtRHj3w9X5PR2Z0EWlTUAlCqXYZH8=w1167-h778-no",
            ""
        ],[
            "https://lh3.googleusercontent.com/2o5Mvy7VX9iAJjayKIczak1BoUPyMPnyglqu3UcKhXv7v13trtoyj-qo2GMOKJxgOcI2uOhnrjB0zBhSTmDV6FB1EaJFuaHDBBgiq7URa1VxtvasmekaCQLGw9TQsWLYVcTx5xJT_-aajcQu4hrEptXFS3po8PR7sDmCVQTkUlWfD0CxBCyKS_057K70uuSUI75c8hN4_PgzC0yUJduTjICI3P8njUUhqkQLxKo7OLm5gvrpJ7Zy-KDsgii-qlAQdPGtcbenu9ZMsFX5zBMKQlaSGD1ifUTGKK4VqRluANeTntWRBNpXzyMkALy-4jv4e4qYwjUeN-CRT9fXdghxdlugV7wtk3rKXDHHMhGG986oOehY_pqFr7U4OHSJHwf6z1GdrU4lH77Rz8UGeV1kso0XcYzSQahh2tB_bYqKpj5rLv1UufWfftVzLD-_4XvrNMjL_9pZxK_4Ec0zjpafXYldv9eCoprUCxCVsKEQPr-e6CT3xQBV0ZrEXgK7EugrV1LMiJ16eXrf1pAbplefp64Q4Uk1wdZw0Ftrz6dsRRhrBZJoC345-M8U3WHbvklE9pREmQ1ooVr1trw19Mg3mx0Dwos83Ao=w1167-h778-no",
            ""
        ],[
            "https://lh3.googleusercontent.com/8D1FV2OfMo6exupqvSlVQGTAxOdLf0iVSD7WXum_1Gg6OEFZurlGmbdPMSDjAisAoJAKWc9QY-bOp1-eHO6S5jGMG5GtXtHGQHAFZd7bTtuiSqp_yAUxi1TWqp1-F3mzD97tk5GmUOERm7rI8ZRNjkj_m0zNpTxbHHwXJXaYwYrlsAU7jzX511GhDNLSYdKmbCOfHCvAlvxHJ87G1t3zFFlHzXV72w-dojCVggtZmraFND5t2AHx6ISSToJj6BB5aRYct1vUDzfLJbuTNfAdDO329PioanzrG5tfbajBHtHECNFfUi9NoNnih-O1R7UmFW7OFXtJYkqz1BT8obien5vpDYvIV-MtvpUaOhL2MAcA_Nj4a2qskfp50ZYn8OguaTQ-I_RhMjAgS2N7P7zmmvWYO726lIJzUU7LAwQj7CKyjt2nlxhfM8-BjJsje7grWujtXqtjteRv_fCbGBpc5kiDRJKzHoR5g5fuiOEs10X5K2kbsGalFUkgDF5vFYhjSRQzt5PMOr9_MNi0gRERadfj-9p6bbk65nUw-lXt0RWFeOQ3dJk6-zPArr0tHZ2FeH1FPpqbvfbu6HB-SsbLhI6-LqwYXb0=w1167-h778-no",
            ""
        ],[
            "https://lh3.googleusercontent.com/BjHxy1hbfuk_Pz1IG90W62hfx8dMwetLBM2XWdyZiLVRbwjlkReX56GHOUzlShS69oljefufyVRcAdKW2R_FhU8LeKjYHtJl-chS6fwOIdzeQxgjcyJR9kXDi75qBo0c1rqf6emuN5SQVEwkUQO-qAYhSX-myqZis4lGtwxUv3e5fvsLbKGC9OX1eTiJD8epLNelSQ1m8ptkEkaLc2vpSeOsh9E0O2TYc2Z2IEqRbIbT1kG0poe_dLactwcE6OiGRjzHMmaVqG8KbqMQoA1cLuUa1EhMyNquAjS6jhsLD_wkblfz47IvFQbibBp1eiFHBcsuhrcga9ciVFfKsNKRyCcmAVMDO6Ybrh6f_nZoCKfBgcj1OOV1mbcAvypPZm4ptN5lvqA1__mbilPTuq5pJCRhYGraVjsXdiBS7pwr6rsyVVS8eDQraECmovlJimVE1IKq0a5VWUaiUx3Vk7kSRQoXiww1x3s56-GVB3s3OvoArVxISFu6SCrb8pL1dfCVHbBEWgKv5O-aQqV7iGyrwVq3NFRMrZs-UGoKhR2gxyt_z32ZfOQNjNG42b6Ct9fIFkBBGoPC0TUHKRz7djdyIN_NBxOhBkQ=w519-h778-no",
            ""
        ]
    ];
    var imageIndex = 0; //tracks current index of displayed photos when inserting each image into DOM

    $('section:not(".section-pattern") > div').each(function(){ //create a gallery for each section that matches
        $(this).prepend(" \
            <div class='row'> \
                <div class='col-md-8 center-block '> \
                    <div class='row flex photoGallery'> \
                    </div> \
                </div> \
            </div> \
        ");
    });

    $('.photoGallery').each(function(){ //for each "gallery" generated, append a number of images (set variable above)
        if ($(window).width() < 1170) {numOfPhotos = 1} //if on a small screen, only display one image
        for (var i = 0; i < numOfPhotos; i++) {
            var imageSrc = photos[imageIndex][0];
            var imageTitle = photos[imageIndex][1];
            $(this).append(" \
                <div class='col-lg-" + (12/numOfPhotos) + " flex'> \
                    <a href='" + imageSrc + "' data-toggle='lightbox' data-type='image' data-gallery='barcampGallery' data-title='" + imageTitle + "'> \
                        <img src='" + imageSrc + "' alt='" + imageTitle + "' class='img-responsive photoGallery'> \
                    </a> \
                </div> \
            ")
            imageIndex++;
            if (imageIndex === photos.length){imageIndex = 0} //loop index if it reaches the end and start over
        }
    });

    $(document).on('click', '[data-toggle="lightbox"]', function (event) { //initiate lightbox
        event.preventDefault();
        $(this).ekkoLightbox();
    });

}());
