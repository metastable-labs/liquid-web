export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;
  const header = process.env.NEXT_PUBLIC_FARCASTER_ASSOCIATION_HEADER;
  const payload = process.env.NEXT_PUBLIC_FARCASTER_ASSOCIATION_PAYLOAD;
  const signature = process.env.NEXT_PUBLIC_FARCASTER_ASSOCIATION_SIGNATURE;

  const config = {
    accountAssociation: {
      header,
      payload,
      signature,
    },
    frame: {
      version: "1",
      name: "Liquid beta",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/icon.png`,
      buttonTitle: "Check this out",
      splashImageUrl: `${appUrl}/images/logo.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
