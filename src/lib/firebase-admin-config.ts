import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
    credential: cert({
        // projectId: 'alakave-ef7b3',
        // clientEmail: 'firebase-adminsdk-h8ppz@alakave-ef7b3.iam.gserviceaccount.com',
        // privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCidAI7nM5jmuM9\nh6AT1j2cUGLVa8njFIiGi25KHA6cPz+7dpuaY5E/gnVyRjhCDcMW7eMCXBO12BOv\nvjl9Zm3v+EiV9CIh+RuXv+Fpxfsb1ih4K03zVDf4vXMVfgmfbjZF8FdAMgkVzaZp\npz72ukTCAwomoWzGJgJCBGMioiE2bi8pMx+8kBBHm5MufR+D2YOEq2Ac+Plkzcq5\nV7UmYDFD7nKr+huub3tJdUsoPaKvp0H8mhkuP7IYex+rwW+5iYKGP7mvf84MDLVS\nqX9Vh67OBLWuxzwYvWytDQSaYyA4Rg0kDGOKqvyHzQBXwx2QYjdcOOHOALkc7A4t\n8S4AsJb7AgMBAAECggEATME8FtdZKnWRfU5Zw1WbqYHPmJ/DdP+MG+m/89L60jcO\nETASh+kYROYKQLJNvWPMM8a01bYUd/v+HTBm8ElXkyR/gx4kjGGq+FFoGvY4VSgj\n2dc4DspRYbx9Jf/1YvcLPJM4XjPl1//g6xViqedLOlF+V884Wgy2T2PMRR5OS+0V\ntEfmnGgx7cE2WFbh7wFWg8Z4+d5TdNAtyKeVxSA0cU0MlMA0ym4ydWj2cmxMOaml\nkAM45Jr9Gd1VTMpvzuP8h1fFh66UGPQS0bAaBkdMIf/Ccwajoenj7z9PsnlSyMrG\nyw9EWmerNdvx+msENCZklLr3wRtHhFJRPq+B5JJCcQKBgQDNLaJ4jpHysflw+8bF\nQ3uKs0U5oERPeBMB41bZ1KTXUjO0ynu7PwznAzAMkNU59+ocWK8PxSlznsO5chLB\nXL/xS/yJb7xmT/bpEqXs7bQCxOXqDXFpxJczElbi6a0HGhdVyGco3esIefu4P9KK\nZI92XoqawomOslRSBqvkREOfMQKBgQDKsSxFAijn0SiM6SzEIngs/DM8nuGWPASt\nzXBz1kK2ANBKwdGAlACIBFmXklq3f9bIZMSyZWm3KXbJhYB+ZDrXZ2A6rt6pNHzp\nkqT7Ns1GD7oY6am7SnFrYtqd3tG1pFoESNth23tbTpR2ffYNFkPOa6ezaS19Efhj\n4HYXMzmF6wKBgHf7W6sMFCTMFoYPdakdUT1GoBCWu9uM5/COtNclFlAj7cCnN7vD\nnxPoNUzj1QzVAL4aziR2s0q9aM8k+frA9i1wtfjYsl9SG50oHodyaXXFFn3L5qpn\nH9PpwY1oAJrKkyLC0jB/tVV7n8ua5s+vBoW9u2fMowwjFFPzOsl9cd3BAoGACnjg\n6qfT6TY7PByH/ZIyV1CobQdgbFypeTlWCAYX6ENef55H7ra22FAxOM2M9lIajLv4\nFad7sMTpqDvHicAv8hUbOazzQBbAJWk4MOqB7I6/dK4N4OlVttCirulmOFZHeFUz\nUHkAhJUown57ie2Oj0msnm5etUmKZc6hC03QOQUCgYBQ1VxLtHu/DhFs7r++YBTz\n++sOY5D3FRpCkK72TBDnGxOzCgCXxykxhuSQgToM54YmcopFVcRncsUEuh3m+Mem\nU0fP65liGwkDHJoE0vTfX6SPfwwZJdBf+9PS7/XTS+WAWYpbZkma4P6kf4knKCSt\nS3meCtOB9zJ2AOzOWNPebg==\n-----END PRIVATE KEY-----\n'.replace(/\\n/g, '\n'),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: `${process.env.FIREBASE_ADMIN_PRIVATE_KEY}.replace(/\\n/g, '\n')`,

    })
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}