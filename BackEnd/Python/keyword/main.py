from fastapi import FastAPI
# import redistest

app = FastAPI()


@app.get("/")
async def root():
    return "dsf"
    # return redistest.getList()


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}