"use client";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Copy, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function SocialShare({ url, title, hashtags }: any) {
  // `url` is the URL of the page you want to share.
  // `title` is the title of the content you're sharing.
  // `hashtags` is an array of hashtags you want to include in the Twitter share.
  // `twitterHandle` is your Twitter username to attribute the tweet to (without @).
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-white">
            <Share2 />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              {/* Facebook Share */}
              <FacebookShareButton url={`${origin}${url}`}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={`${origin}${url}`}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`${origin}${url}`}
                title={"title"}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <EmailShareButton
                url={"shareUrl"}
                subject={"title"}
                body="body"
                className="Demo__some-network__share-button"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>

              {/* Twitter Share */}
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SocialShare;
