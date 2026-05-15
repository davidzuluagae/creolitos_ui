import React, { useState } from 'react';

export default function Subscribe() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send this to your API/backend
        console.log('Subscribed:', email);
        setSubscribed(true);
        setEmail('');
    };

    return (
        <div className="mb-6">
            {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-sm">Subscribe to our newsletter</label>
                    <div className="flex">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            required
                            className="px-4 py-2 rounded-l focus:outline-none flex-1"
                        />
                        <button
                            type="submit"
                            className="bg-creoSkin-300 hover:text-creoSkin-100 text-creoSkin-400 px-4 py-2 rounded-r"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-creoCont-pink">Thanks for subscribing!</p>
            )}
        </div>
    );
}
